const fs = require('fs');
const scrapingbee = require('scrapingbee');
const data = require('./data');
const { saveJson } = require('./utils');

const cookies = {
  "sessionid": process.env.session_id,
  "csrftoken": process.env.csrf_token,
  "user_id": process.env.user_id,
};
 
async function login() {
  var client = new scrapingbee.ScrapingBeeClient(process.env.bee_client); // New ScrapingBee client

  var response = await client.get({
    url: "https://afascursos.com.br/ead/",
    params: {
      "screenshot_full_page": "true"
    },
    cookies,
  }).then((response)=> {
    fs.writeFileSync("./screenshots/login.png", response.data)
  }) // Save the contents of the request (screenshot) to the 'path' file destination
  .catch((e)=> {
    console.log("An error has occured: " + e.message);
    return { error: { type: 'login', message: e.message } };
  });
};

function filterLinks(links = []) {
  const valids = [];

  for (const link of links) {
    if (typeof link != 'string') {
      continue;
    }

    let valid = false;
    let type = '';

    if (link.match(/youtube/i)) {
      valid = true;
      type = 'youtube';
    }

    if (link.match(/vimeo/i)) {
      valid = true;
      type = 'vimeo';
    }

    if (link.match(/download/i)) {
      valid = true;
      type = 'download';
    }

    if (valid) {
      valids.push({
        type,
        href: link
      });
    }
  };

  return valids;
}

async function script(sectionNumber) {
  const filePath = `./data/sections_${sectionNumber}.json`;
  try {
    fs.readFile(filePath, async function (error, content) {
      const section = JSON.parse(content);

      if (!!section) {
        var client = new scrapingbee.ScrapingBeeClient(process.env.bee_client); // New ScrapingBee client

        const { links } = section;
      
        const newLinks = [];
      
        for (const link of links) {
          let filteredLinks = [];
      
          const response = await client.get({
            url: link.href,
            params: {
              'extract_rules':{
                "links": {
                  "selector": "a",
                  "output": "@href",
                  "type": "list"
                }
              },
            },
            cookies,
          });
      
          if (response.data) {
            var decoder = new TextDecoder();
            var dataJSON = decoder.decode(response.data);
            const links =JSON.parse(dataJSON)
            filteredLinks = filterLinks(links.links);
          }
      
          newLinks.push({
            ...link, 
            links: filteredLinks
          });
        }
      
        section.links = newLinks;
      
        saveJson(section, `./dataWithLinks/sections_${sectionNumber}.json`);
      }
    });
  } catch(err) {
    return { error: 'read_file error' };
  }
}

module.exports = script;