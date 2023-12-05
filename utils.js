const fs = require('fs');

function saveJson(data, filename) {
  const jsonContent = JSON.stringify(data);

  fs.writeFile(filename, jsonContent, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
  }); 
}

function formatNameToFilename(text) {
  text = text.toLowerCase();
  text = text.replace(/[^a-zA-Z0-9 ]/, '');
  text = text.replace(new RegExp("[áàãâä]", "gi"), "a");
  text = text.replace(new RegExp("[éèêë]", "gi"), "e");
  text = text.replace(new RegExp("[íìîï]", "gi"), "i");
  text = text.replace(new RegExp("[óòõôö]", "gi"), "o");
  text = text.replace(new RegExp("[úùûü]", "gi"), "u");
  text = text.replace(new RegExp("[ç]", "gi"), "c");
  text = text.replace(new RegExp("[-]", "gi"), "");
  text = text.replace(new RegExp(" ", "gi"), "_");
  return text;
}

module.exports = {
  saveJson,
  formatNameToFilename
}