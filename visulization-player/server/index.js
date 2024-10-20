// require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const { searchYouTube, getLyrics } = require('./netlify/services/youtube.services');
const mp3Directory = path.join(__dirname, './../../assets');
const { PassThrough } = require('stream');
const app = express();
const port = process.env.PORT || 3000;
const corsAnywhere = require('cors-anywhere');
// Path to ffmpeg binary
app.use(cors());
app.use(express.json());
const request = require('request');
const router = express.Router();
//Get all students
router.get('/api', (req, res) => {
  res.send('App is running..');
});

// Serve static files from the 'mp3-files' directory
router.use('/files', express.static(path.join(__dirname, './../../assets')));

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


router.get('/api/get-lyrics',  async (req, res) => {
  try {
    const keyword = req.query.id;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const data = await getLyrics(keyword);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for songs' });
  }
})

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

router.get('/proxy/*', (req, res) => {
  const url = req.url.replace('/proxy/', '');
  request({ url, headers: { 'Origin': process.env.URL } }).pipe(res);
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


// CORS Anywhere setup
const corsProxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: ['cookie', 'cookie2'],
});

// Use /cors for CORS proxying
router.use('/cors/', (req, res) => {
  corsProxy.emit('request', req, res);
});

// Endpoint to stream audio from YouTube
router.get('/stream', async (req, res) => {
  const videoUrl = req.query.url; // YouTube URL passed as query parameter

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid or missing YouTube URL');
  }

  try {
    // Set response headers to indicate audio file download
    res.setHeader('Content-Type', 'audio/mpeg');

    // Stream only audio from the YouTube video
    ytdl(videoUrl, {
      filter: 'audioonly',
      quality: 'highestaudio',
    }).pipe(res);

  } catch (err) {
    console.error('Error streaming audio:', err);
    res.status(500).send('Error streaming audio');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/', router);
