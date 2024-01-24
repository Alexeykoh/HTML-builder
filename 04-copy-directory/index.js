const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname + '/files');
const copyFolderPath = filePath + '-copy';
//
console.clear();
//
function createFolder(folderName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.join(folderName), (err) => {
      if (err) {
        reject(err);
      }
      console.log('Создана папка: ', folderName);
      resolve(folderName);
    });
  });
}

function copyFiles(files) {
  return new Promise((resolve, reject) => {
    try {
      console.log('Копирование файлов: ', files);
      files.forEach((file) => {
        const oldFile = path.join(filePath, file);
        const newFile = path.join(copyFolderPath, file);
        fs.copyFile(oldFile, newFile, (err) => {
          if (err) {
            console.log('copy err: ', err);
            reject(err);
          }
        });
      });
      console.log('Файлы скопированы...');
      resolve('done');
    } catch (error) {
      reject(error);
    }
  });
}

function deleteFiles(files) {
  return new Promise((resolve, reject) => {
    try {
      console.log('Удаление файлов: ', files);
      files.forEach((file) => {
        const remFileLink = path.join(copyFolderPath, file);
        fs.unlink(remFileLink, (err) => {
          reject(err);
        });
      });
      console.log('Файлы удалены...');
      resolve('done');
    } catch (err) {
      reject(err);
    }
  });
}

// readFiles();

function readFolder(folder) {
  return new Promise((resolve, reject) => {
    console.log('Чтение папки: ', folder);
    fs.readdir(folder, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

createFolder(copyFolderPath)
  .then(() => {
    readFolder(filePath).then((files) => {
      copyFiles(files);
    });
  })
  .catch(() => {
    readFolder(copyFolderPath).then((files) => {
      deleteFiles(files).then(() => {
        readFolder(filePath).then((files) => {
          copyFiles(files);
        });
      });
    });
  });
