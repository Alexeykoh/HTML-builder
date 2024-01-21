const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname + '/secret-folder');
//
function readFiles() {
  fs.readdir(filePath, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(async (file) => {
        const extname = path.extname(file).slice(1);
        const basename = path.basename(file, extname).slice(0, -1);
        const size = fs.statSync(path.join(filePath, file)).size;
        console.log(basename, ' - ', extname, ' - ', size);
      });
    }
  });
}

readFiles();
