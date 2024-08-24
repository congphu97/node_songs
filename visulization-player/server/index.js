require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const { searchYouTube } = require('./netlify/services/youtube.services');
const mp3Directory = path.join(__dirname, './../../assets');
const { PassThrough } = require('stream');
const app = express();
const port = process.env.PORT || 3000;
// Path to ffmpeg binary
app.use(cors());
app.use(express.json());

const router = express.Router();

//Get all students
router.get('/api', (req, res) => {
  res.send('App is running..');
});

// Serve static files from the 'mp3-files' directory
router.use('/files', express.static(path.join(__dirname, './../../assets')));

router.get('/api/play', (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('URL is required');
  }

  // Stream audio directly to the response
  ytdl(videoUrl, {
    filter: 'audioonly',
    quality: 'highestaudio'
  }).pipe(res).on('error', (err) => {
    console.error('Stream error:', err);
    res.status(500).send('Error streaming audio');
  });

  // Add appropriate headers for audio streaming
  res.setHeader('Content-Type', 'audio/mpeg');
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/', router);
