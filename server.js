const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// CORS setup to allow requests from specific origin
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Allow only requests from this origin
  })
);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve home.html when the root route is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Dynamic API to list all images in the "images" folder
app.get("/api/images", (req, res) => {
  const imageDir = path.join(__dirname, "public", "images");
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error("Error reading images directory:", err);
      res.status(500).send("Unable to fetch images");
    } else {
      const images = files.filter((file) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      ); // Only include image files
      res.json(images);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
