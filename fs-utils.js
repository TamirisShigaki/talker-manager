const fs = require('fs/promises');

function getTalker() {
    return fs.readFile('./talker.json', 'utf-8')
      .then((fileContent) => JSON.parse(fileContent));
  }

module.exports = { getTalker };
