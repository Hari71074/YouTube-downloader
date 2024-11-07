const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API endpoint for downloading YouTube video or audio
app.post("/download", (req, res) => {
  const url = req.body.url;
  const format = req.body.format || 'mp4'; // Default to mp4 video

  // Build yt-dlp command for video/audio download
  const command = `yt-dlp -f ${format} -o "./downloads/%(title)s.%(ext)s" ${url}`;

  // Run yt-dlp command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send({ error: error.message });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send({ error: stderr });
    }

    console.log(`stdout: ${stdout}`);
    res.send({ message: "Download started!", stdout });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
