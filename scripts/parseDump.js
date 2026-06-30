const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../striver_dump_full.json');
let content = fs.readFileSync(filePath);

// Detect if UTF-16
let text = '';
if (content[0] === 0xff && content[1] === 0xfe) {
  text = content.toString('utf16le');
} else if (content[0] === 0xfe && content[1] === 0xff) {
  text = content.toString('utf16be');
} else {
  text = content.toString('utf8');
}

// Strip BOM
text = text.replace(/^\uFEFF/, "");

try {
  const data = JSON.parse(text);
  console.log("Parsed successfully!");
  console.log("Total entries in dump:", data.entries ? data.entries.length : "none");
  if (data.entries) {
    const videos = data.entries.map(e => ({
      title: e.title,
      id: e.id
    }));
    fs.writeFileSync(
      path.join(__dirname, '../data/striverVideos.ts'),
      'export const striverVideos = ' + JSON.stringify(videos, null, 2)
    );
    console.log("Saved to data/striverVideos.ts!");
  }
} catch (e) {
  console.error("JSON Error:", e.message);
}
