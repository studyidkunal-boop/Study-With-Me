const ytdlp = require("yt-dlp-exec");
const fs = require("fs");

(async () => {
  const url =
    "https://www.youtube.com/playlist?list=PLDzeHZWIZsTqNW1gvXXAicBgku9uPZeOC";

  const output = await ytdlp(url, {
    dumpSingleJson: true,
    flatPlaylist: true,
  });

  const videos = output.entries.map((v) => ({
    title: v.title,
    id: v.id,
  }));

  fs.writeFileSync(
    "./data/videos.ts",
    "export const videos = " +
      JSON.stringify(videos, null, 2)
  );

  console.log("Done ✔");
})();