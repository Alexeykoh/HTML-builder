const fs = require('fs');
const path = require('path');
//
const dir = path.join(__dirname);
//

function deepFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const pathForRecursion = path.join(dirPath, entry.name);
    const ext = path.extname(entry.name);
    const name = path.basename(entry.name, ext);
    fs.stat(pathForRecursion, (err, stats) => {
      const size = (stats.size / 1024).toFixed(2);
      //
      if (err) {
        console.log('fs.stat error: ', err);
      } else {
        if (entry.isDirectory()) {
          deepFiles(pathForRecursion);
        } else {
          console.log(name, ' - ', ext, ' - ', size + 'kb');
        }
      }
    });
  });
}

deepFiles(dir);
