const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname + '/files');
//

function createFolder(folderName) {
  fs.mkdir(path.join(folderName), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });
}

function readFiles() {
  // create new folder
  const copyFolderPath = filePath + '-copy';
  createFolder(copyFolderPath);
  //
  // read start folder
  fs.readdir(filePath, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(async (file) => {
        const oldFile = path.join(filePath, file);
        const newFile = path.join(copyFolderPath, file);
        fs.copyFile(oldFile, newFile, (err) => {
          if (err) {
            console.log('copy err: ', err);
          }
        });
      });
    }
  });
}

readFiles();
