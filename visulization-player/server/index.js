// const ytdl = require('@distube/ytdl-core');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');
// const ffmpegPath = require('ffmpeg-static');

// const videoUrl = 'https://www.youtube.com/watch?v=09Mh7GgUFFA';

// // Ensure ffmpeg path is set
// ffmpeg.setFfmpegPath(ffmpegPath);

// // Set up the stream
// const stream = ytdl(videoUrl, { quality: 'highestaudio' });

// // Save the stream to a file
// const outputPath = path.resolve(__dirname, 'output.mp3');
// ffmpeg(stream)
//   .audioBitrate(128)
//   .save(outputPath)
//   .on('end', () => {
//     console.log('Download finished');
//   })
//   .on('error', err => {
//     console.error('Error occurred:', err);
//   });


//   var player = require('play-sound')(opts = {})

//   // $ mplayer output.mp3 
//   player.play('output.mp3', function(err){
// 	if (err) throw err
//   })

//   // { timeout: 300 } will be passed to child process
//   player.play('output.mp3', { timeout: 300 }, function(err){
// 	if (err) throw err
//   })

//   // configure arguments for executable if any
//   player.play('output.mp3', { afplay: ['-v', 2 ] /* lower volume for afplay on OSX */ }, function(err){
// 	if (err) throw err
//   })

//   // access the node child_process in case you need to kill it on demand
//   var audio = player.play('output.mp3', function(err){
// 	if (err && !err.killed) throw err
//   })

//   const player = require('play-sound')(opts = {});

// // Function to play the next song
// function playNextSong(songPath) {
//     player.play(songPath, function(err){
//         if (err) {
//             console.error(`Could not play sound: ${err}`);
//         } else {
//             console.log(`Playing: ${songPath}`);
//         }
//     });
// }

// // Example usage:
// const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
// let currentSongIndex = 0;

// function nextSong() {
//     currentSongIndex = (currentSongIndex + 1) % songs.length;
//     playNextSong(songs[currentSongIndex]);
// }

// // Start playing the first song
// playNextSong(songs[currentSongIndex]);

// // Move to the next song every 5 seconds
// setInterval(nextSong, 5000);

//   audio.kill();

// const NodeID3 = require('node-id3');

// // const tags = NodeID3.read('output.mp3');
// // console.log(tags);

// const tags = {
//     title: "My Song",
//     artist: "Artist Name",
//     album: "Album Name",
//     TENC: "Encoding Technology Example",  // Encoding technology (TENC) frame
//     custom: {
//         ENC: "Custom Encryption Information"  // Custom frame for encryption technology
//     }
// };

// NodeID3.write(tags, 'audio.mp3');

// console.log({tags})

// const ytsr = require('ytsr');
// const {collection, addDoc } = require('firebase/firestore');
// const {db} = require('./firebase.config');
// async function searchYouTube(query) {
//     try {
//         // Search YouTube for the given query
//         const searchResults = await ytsr(query, { limit: 5 });

//         // Extract and display the video titles and links
//         searchResults.items.forEach(item => {
//             if (item.type === 'video') {
//                 console.log(`Title: ${item.title}`);
//                 console.log(`Link: ${item.url}`);
//                 console.log({item});
//             }
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// // Search for "Node.js" videos
// searchYouTube('mộng yu');
// const fs = require('fs');
// const path = require('path');
// Path to your MP3 file
// const filePath = 'output.mp3';
// const chunkSize = 1024 * 1024; // 1 MB chunk size (adjust as needed)

// Read the file as binary data
// fs.readFile(filePath, (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     // `data` is a Buffer containing binary data of the MP3 file
//     console.log('File read successfully.');

//     // Optionally, convert the binary data to base64 for storage or transfer
//     const base64Data = data.toString('base64');
//     const fileName = "output.mp3";
//     // const chunks = splitBase64String(base64Data, chunkSize);
//     // createFirstCollection(chunks);

//     uploadBase64(base64Data, fileName)
//     .then((url) => {
//         console.log('File uploaded successfully:', url);
//     })
//     .catch((error) => {
//         console.error('Error uploading file:', error);
//     });
//     console.log('Base64 Encoded Data:', base64Data);
// });

// function splitBase64String(base64String, chunkSize) {
//     // Split the string into an array of substrings of chunkSize
//     const chunks = [];
//     for (let i = 0; i < base64String.length; i += chunkSize) {
//         chunks.push(base64String.substring(i, i + chunkSize));
//     }
//     return chunks;
// }

// async function uploadSongs(fileName, publicLink) {
//     try {
//         const docRef = await addDoc(collection(db, "songs"), {
//           name: fileName,
//           createdAt: new Date(),
//           url: publicLink,
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }


// ======Upload firebase store=======
// const admin = require('firebase-admin');
// const path = require('path');

// // Initialize Firebase Admin SDK
// const serviceAccount = require('./serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://fir-5c0c9.appspot.com' // Replace with your Firebase Storage bucket URL
// });



// const bucket = admin.storage().bucket();

// // Function to upload Base64 string
// async function uploadBase64(base64String, fileName) {
//     const buffer = Buffer.from(base64String, 'base64');
//     const file = bucket.file(fileName);
//     const stream = file.createWriteStream({
//         metadata: {
//             contentType: 'audio/mpeg' // Set MIME type based on the file type
//         }
//     });

//     stream.end(buffer);

//     return new Promise((resolve, reject) => {
//         stream.on('finish', async () => {
//             try {
//                 await file.makePublic(); // Optional
//                 const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

//                 uploadSongs(fileName, publicUrl);

//                 resolve(publicUrl);
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         stream.on('error', (err) => {
//             reject(err);
//         });
//     });
// }


// ==== Cron job clean up all data 
// const admin = require('firebase-admin');
// const path = require('path');
// var cron = require('node-cron');

// // Initialize Firebase Admin SDK
// const serviceAccount = require('./serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://fir-5c0c9.appspot.com' // Replace with your Firebase Storage bucket URL
// });

// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
//   });


// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Make the server listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});