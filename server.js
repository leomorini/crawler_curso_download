const express = require('express');
const app = express();
const port = 3500;

//personal files
const script = require('./script');
const scriptDownloadFiles = require('./script_download_files');
const parseData = require('./parseData');

app.get('/test_debug', () => {
  return false;
});

app.get('/convert_data', (req, res) => {
  parseData();
  return res.json();
});

app.get('/get_downloads', async (req, res) => {
  await scriptDownloadFiles();
  return res.json({});
})


app.get('/get_sections/:section', async (req, res) => {
  const section = req.params.section;
  await script(section);
  return res.json({ 'message': section });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})