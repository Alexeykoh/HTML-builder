const fs = require('fs');
const path = require('path');
//
const filePath = path.join(__dirname + '/styles');
//

function readFiles() {
  fs.readdir(filePath, async (err, files) => {
    if (err) console.log(err);
    else {
      fs.writeFile(
        __dirname + '/project-dist/bundle.css',
        '',
        function (error) {
          if (error) return console.log(error);
        },
      );
      //
      files.map((file) => {
        const extname = path.extname(file).slice(1);
        const cssFilePath = path.join(filePath, file);
        if (extname === 'css') {
          console.log(cssFilePath);
          const readStream = fs.createReadStream(cssFilePath, {
            encoding: 'utf-8',
          });
          readStream
            .on('data', function (cssText) {
              fs.writeFile(
                __dirname + '/project-dist/bundle.css',
                cssText + ' \n ',
                { flag: 'a' },
                function (error) {
                  if (error) return console.log(error);
                },
              );
            })
            .on('error', function (err) {
              console.log(err);
            });
        }
      });
      // console.log(allCss);
    }
  });
}

readFiles();
