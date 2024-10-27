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

// const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

// GitHub OAuth credentials
const GITHUB_CLIENT_ID = 'Ov23liMu9W70NVablaSN';       // Replace with your GitHub Client ID
const GITHUB_CLIENT_SECRET = '471b46038c1dca872bc481f9829b031e66969618'; // Replace with your GitHub Client Secret

// Configure session
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Configure GitHub strategy
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
    // Here, you can save the user info to your database if needed
    return done(null, profile);
}));

// Middleware to check if token is expired
function checkTokenExpiration(req, res, next) {
  const currentTime = Date.now();

  if (req.user && req.user.token_expiration) {
      if (currentTime > req.user.token_expiration) {
          return res.status(401).json({ message: 'Token has expired' });
      }
  }

  next();
}

app.get('/api/user', checkTokenExpiration, (req, res) => {
  res.json(req.user); // Return user info if logged in
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Home</h1><a href="/auth/github">Login with GitHub</a>');
});

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to profile.
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    console.log(req.isAuthenticated())
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`<h1>Hello, ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/', router);
