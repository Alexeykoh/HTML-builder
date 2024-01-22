const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname);
const bundlePath = path.join(filePath, '/project-dist');
const template = path.join(filePath, '/template.html');
const components = path.join(filePath, '/components');
const stylesFolder = path.join(filePath, '/styles');
const assetsFolder = path.join(filePath, '/assets');

function createFolder(folder) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folder, { recursive: true }, async (err) => {
      if (err) {
        return reject(err);
      }
      resolve(folder);
    });
  });
}

function copyTemplate() {
  return new Promise((resolve, reject) => {
    const oldFile = path.join(filePath, '/template.html');
    const newFile = path.join(bundlePath, '/index.html');
    fs.copyFile(oldFile, newFile, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function read(entriesPath) {
  return new Promise((resolve, reject) => {
    const entryFiles = fs.createReadStream(entriesPath, {
      encoding: 'utf-8',
    });
    entryFiles.on('error', (err) => {
      reject(err);
    });
    entryFiles.on('data', (data) => {
      resolve(data);
    });
  });
}

function write(destinationPath, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(destinationPath, text + ' \n ', function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function readFolder(folder) {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, async (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

function mergeStyles() {
  return new Promise((resolve, reject) => {
    try {
      write(bundlePath + '/style.css', '');
      //
      readFolder(stylesFolder).then((files) => {
        for (let i = 0; i < files.length; i++) {
          const extname = path.extname(files[i]).slice(1);
          // const basename = path.basename(files[i], extname).slice(0, -1);
          //
          if (extname === 'css') {
            read(path.join(stylesFolder, files[i])).then((cssText) => {
              fs.appendFile(bundlePath + '/style.css', cssText, (err) => {
                if (err) {
                  reject(err);
                }
              });
            });
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    fs.copyFile(source, destination, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function copyAssets() {
  return new Promise((resolve, reject) => {
    try {
      const newAssetsFolder = path.join(bundlePath, '/assets');
      createFolder(newAssetsFolder)
        .then(() => {
          readFolder(assetsFolder).then((folders) => {
            for (let i = 0; i < folders.length; i++) {
              const sourceFolder = path.join(assetsFolder, folders[i]);
              const newFolderName = path.join(newAssetsFolder, folders[i]);
              createFolder(newFolderName).then(() => {
                readFolder(sourceFolder).then((files) => {
                  for (let i = 0; i < files.length; i++) {
                    const newSourceFolder = path.join(sourceFolder, files[i]);
                    const destinationFolder = path.join(
                      newFolderName,
                      files[i],
                    );
                    copyFile(newSourceFolder, destinationFolder);
                  }
                });
              });
            }
          });
        })
        .then(() => {
          resolve('complete');
        });
    } catch (err) {
      reject(err);
    }
  });
}

console.clear();
console.log('#=======================');
console.log('start script');
console.log('#=======================');
//
createFolder(bundlePath);
copyTemplate();
readFolder(components).then((files) => {
  read(template).then(async (res) => {
    let newHTML = res;
    for (let i = 0; i < files.length; i++) {
      const extname = path.extname(files[i]).slice(1);
      const basename = path.basename(files[i], extname).slice(0, -1);
      //
      await read(path.join(components, files[i]))
        .then((res) => {
          newHTML = newHTML.replaceAll(`{{${basename}}}`, res);
          return newHTML;
        })
        .then((res) => {
          const newFile = path.join(bundlePath, '/index.html');
          write(newFile, res);
        });
    }
  });
});
mergeStyles();
copyAssets().then((res) => {
  console.log(res);
});
