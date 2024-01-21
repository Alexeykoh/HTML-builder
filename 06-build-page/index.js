const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname);
const bundlePath = path.join(filePath, '/project-dist');
console.clear();

function createFolder(folderPath) {
  fs.mkdir(folderPath, { recursive: true }, async (err) => {
    if (err) {
      return console.error(err);
    }
    return 'folder was created';
  });
}

function copyTemplate() {
  const oldFile = path.join(filePath, '/template.html');
  const newFile = path.join(bundlePath, '/index.html');
  fs.copyFile(oldFile, newFile, (err) => {
    if (err) {
      console.log('copy err: ', err);
    }
  });
}

// function rewriteFile(filePath, newText) {
//   fs.writeFile(filePath, newText + ' ', function (error) {
//     if (error) return console.log(error);
//   });
// }

function write(writePath, text) {
  fs.writeFile(writePath, text + ' \n ', function (error) {
    if (error) return console.log(error);
  });
}

function replaceTags(tagName, componentText) {
  const readHTML = fs.createReadStream(bundlePath + '/index.html', {
    encoding: 'utf-8',
  });
  readHTML.on('data', (data) => {
    console.log(tagName);
    const newHTML = data.replace(`{{${tagName}}}`, componentText);
    write(bundlePath + '/index.html', newHTML);
  });
  //
}

function htmlHydration() {
  const componentsPath = path.join(filePath, '/components');
  fs.readdir(componentsPath, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(async (file) => {
        const extname = path.extname(file).slice(1);
        const basename = path.basename(file, extname).slice(0, -1);
        // console.log(basename);
        const readComponent = fs.createReadStream(
          path.join(componentsPath, file),
          {
            encoding: 'utf-8',
          },
        );
        readComponent.on('data', () => {
          // console.log(data);
          replaceTags(basename, 'kekekeker');
        });
      });
    }
  });
}

createFolder(bundlePath);
copyTemplate();
htmlHydration();
