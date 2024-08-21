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

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const router = express.Router();

//Get all students
router.get('/api', (req, res) => {
  res.send('App is running..');
});

// Serve static files from the 'mp3-files' directory
router.use('/files', express.static(path.join(__dirname, './../../assets')));

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

router.get('/api/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword query parameter is required' });
    }

    const data = await searchYouTube(keyword);
    res.send((data));
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
// app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);