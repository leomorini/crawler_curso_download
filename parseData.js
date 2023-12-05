const data = require('./data');
const { saveJson } = require('./utils');

module.exports = function () {
  for (const [index, section] of data.entries()) {  
    saveJson(section, `./data/sections_${index}.json`);
  }
}