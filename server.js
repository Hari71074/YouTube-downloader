const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all domains (use with caution in production)
app.use(cors());

// OR Enable CORS only for your GitHub Pages domain
// app.use(cors({
//   origin: 'https://your-username.github.io'  // Allow only your GitHub Pages domain
// }));

// Simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('YouTube Downloader API is running!');
});

// Download route that takes the YouTube video URL as a query parameter
app.get('/download', (req, res) => {
  const videoUrl = req.query.url;

  // Validate YouTube URL
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL.');
  }

  // Set headers for the file download
  res.header('Content-Disposition', 'attachment; filename=video.mp4');

  // Pipe the video download stream to the response
  ytdl(videoUrl, { format: 'mp4' }).pipe(res);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
