fetch('https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz')
  .then(r => r.text())
  .then(html => {
    const videoCount = html.match(/"videoCount":"(\d+)"/)?.[1];
    const playlistTitle = html.match(/"title":"Strivers A2Z-DSA Course([^"]+)"/)?.[0];
    const totalVideosText = html.match(/"text":"(\d+)\s+videos"/)?.[0];
    console.log('VideoCount:', videoCount);
    console.log('PlaylistTitle:', playlistTitle);
    console.log('TotalVideosText:', totalVideosText);
  })
  .catch(err => console.error(err));
