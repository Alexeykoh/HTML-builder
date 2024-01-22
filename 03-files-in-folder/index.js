const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname, '/secret-folder');
//
function readFiles() {
  fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    //
    files.forEach((file) => {
      if (file.isFile()) {
        const folder = path.join(filePath, file.name);
        const extname = path.extname(folder).slice(1);
        const basename = path.basename(folder, extname).slice(0, -1);
        const size = fs.statSync(folder).size;
        console.log(basename, ' - ', extname, ' - ', size);
      }
    });
  });
}

readFiles();
