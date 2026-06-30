const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

const binPath = path.join(__dirname, "../node_modules/yt-dlp-exec/bin/yt-dlp.exe");
const url = "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHS";

console.log("Running Striver Playlist Fetcher with correct A2Z DSA playlist...");
execFile(
  binPath,
  ["--flat-playlist", "--dump-single-json", url],
  { maxBuffer: 1024 * 1024 * 100 }, // 100 MB buffer
  (error, stdout, stderr) => {
    if (error) {
      console.error("Exec error:", error);
      return;
    }
    
    try {
      const data = JSON.parse(stdout);
      const videos = data.entries.map((v) => ({
        title: v.title,
        id: v.id
      }));
      
      fs.writeFileSync(
        path.join(__dirname, "../data/striverVideos.ts"),
        "export const striverVideos = " + JSON.stringify(videos, null, 2)
      );
      
      console.log(`Successfully fetched ${videos.length} videos!`);
    } catch (e) {
      console.error("JSON parse/write error:", e);
    }
  }
);
