
const fs = require('fs');
const youtubedl = require('youtube-dl')

const { formatNameToFilename } = require('./utils');
const total_sections = 35;
const path = './resources';
const dataWithLinksPath = './dataWithLinks';

module.exports = async function() {
  for (let i = 2; i < 3; i++) {
    fs.readFile(`${dataWithLinksPath}/sections_${i}.json`, async function (error, content) {
      const section = JSON.parse(content);
      const section_path = `./resources/cap_${i}_${formatNameToFilename(section.title)}`;
      
      if (section.links.length > 0) {
        for (const link of section.links) {
          const mediaLinks = link.links;
          if (mediaLinks.length > 0) {
            const isExist = await fs.existsSync(section_path);
            if (!isExist){
              await fs.mkdirSync(section_path);
            }

            for (const [index, media] of mediaLinks.entries()) {
              if (media.type == 'vimeo') {
                try {
                  const video = await youtubedl(media.href + '?embedded=true&source=vimeo_logo&owner=84151823',
                    // Optional arguments passed to youtube-dl.
                    ['--format=18'],
                    // Additional options can be given for calling `child_process.execFile()`.
                    { cwd: __dirname })
  
                  // Will be called when the download starts.
                  video.on('info', function(info) {
                    console.log('Download started')
                    console.log('filename: ' + info._filename)
                    console.log('size: ' + info.size)
                  })
  
                  video.pipe(fs.createWriteStream(`${section_path}/video_${index}.mp4`))
                } catch (error) {
                  console.log(error.message);
                  continue;
                }
              }
            }
          }
        }
      }
    });
  }
};