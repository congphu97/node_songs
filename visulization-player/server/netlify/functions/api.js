require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const { searchYouTube } = require('../services/youtube.services');
const mp3Directory = path.join(__dirname, './../../assets');
const { PassThrough } = require('stream');
const app = express();
const port = process.env.PORT || 3000;
// Path to ffmpeg binary
const request = require('request');

app.use(cors());
app.use(express.json());

const router = express.Router();

//Get all students
router.get('/api', (req, res) => {
  res.send('App is running..');
});

// Serve static files from the 'mp3-files' directory
router.use('/files', express.static(path.join(__dirname, './../../assets')));
router.get('/api/process', (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'URL query parameter is required' });
  }

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  // Set headers to stream audio
  res.setHeader('Content-Type', 'audio/mp3');
  res.setHeader('Accept-Ranges', 'bytes');

  // Create a PassThrough stream for FFmpeg output
  const passthrough = new PassThrough();

  // Create a readable stream for the YouTube audio
  const audioStream = ytdl(videoUrl, { filter: 'audioonly' });

  // Set up FFmpeg to process the audio stream
  const ffmpegProcess = ffmpeg(audioStream)
    .setFfmpegPath(ffmpegPath)
    .audioCodec('libmp3lame')
    .format('mp3')
    .on('error', (err) => {
      console.error('FFmpeg error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'An error occurred while processing the audio' });
      }
      passthrough.end(); // End the PassThrough stream on FFmpeg error
    })
    .on('end', () => {
      console.log('FFmpeg processing finished');
    });

  // Pipe FFmpeg output to PassThrough stream
  ffmpegProcess.pipe(passthrough);

  // Pipe the PassThrough stream to the response
  passthrough.pipe(res);

  // Handle errors from the YouTube audio stream
  audioStream.on('error', (err) => {
    console.error('YTDL error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'An error occurred while fetching the audio' });
    }
    passthrough.end(); // End the PassThrough stream on YTDL error
  });
  res.on('error', (err) => {
    console.error('Response stream error:', err);
    passthrough.end(); // End the PassThrough stream on response error
  });
});

router.get('/api/songs', (req, res) => {
  fs.readdir(mp3Directory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }

    // Filter out MP3 files
    const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');
    res.json(mp3Files);
  });
});

// router.get('/api/play', (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl) {
//     return res.status(400).send('URL is required');
//   }

//   // Stream audio directly to the response
//   ytdl(videoUrl, {
//     filter: 'audioonly',
//     quality: 'highestaudio'
//   }).pipe(res).on('error', (err) => {
//     console.error('Stream error:', err);
//     res.status(500).send('Error streaming audio');
//   });

//   // Add appropriate headers for audio streaming
//   res.setHeader('Content-Type', 'audio/mpeg');
// });
// router.get('/api/play', async (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl) {
//     return res.status(400).json({ error: 'URL query parameter is required' });
//   }

//   // Validate if the URL is a valid YouTube URL
//   if (!ytdl.validateURL(videoUrl)) {
//     return res.status(400).json({ error: 'Invalid YouTube URL' });
//   }

//   // Set headers to stream audio
//   res.setHeader('Content-Type', 'audio/mpeg');

//   // Create a read stream for the YouTube audio
//   const audioStream = await ytdl(videoUrl, { filter: 'audioonly' });

//   // Create an ffmpeg process
//   const ffmpegProcess = ffmpeg({ source: audioStream })
//     .setFfmpegPath(ffmpegPath)
//     .audioCodec('libmp3lame')
//     .format('mp3')
//     .on('error', (err) => {
//       console.error('FFmpeg error:', err);
//       if (!res.headersSent) {
//         res.status(500).json({ error: 'An error occurred while processing the audio' });
//       }
//     })
//     .on('end', () => {
//       console.log('FFmpeg processing finished');
//     });

//   // Pipe the ffmpeg output to the response
//   ffmpegProcess.pipe(res, { end: true });

//   // Handle errors from the ytdl stream
//   audioStream.on('error', (err) => {
//     console.error('YTDL error:', err);
//     if (!res.headersSent) {
//       res.status(500).json({ error: 'An error occurred while processing the audio' });
//     }
//   });

//   // Handle response stream errors
//   res.on('error', (err) => {
//     console.error('Response stream error:', err);
//   });
// });
router.get('/api/play', async (req, res) => {
  const link = getAudioUrl(req.query.url).then(url => {
    console.log('Audio URL:', url);
    res.json(url);
  })
    .catch(err => {
      console.error('Error:', err);
    });;
  console.log({ link })
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Function to get the audio URL from a YouTube video
async function getAudioUrl(videoUrl) {
  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
    return format.url;
  } catch (error) {
    throw new Error(`Failed to fetch audio URL: ${error.message}`);
  }
}

router.get('/api/proxy/*', (req, res) => {
  const url = req.url.replace('/api/proxy/', '');
  request({ url, headers: { 'Origin': 'http://localhost:8888/' } }).pipe(res);
});

router.get('/api/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const data = await searchYouTube(keyword);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for songs' });
  }
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

app.use('/', router);

module.exports.handler = serverless(app);
