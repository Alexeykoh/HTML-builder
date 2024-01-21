const fs = require('fs');
const readStream = fs.createReadStream(__dirname + '/text.txt', {
  encoding: 'utf-8',
});
readStream
  .on('data', function (ch) {
    console.log(ch);
  })
  .on('error', function (err) {
    console.log(err);
  })
  .on('end', function () {
    console.log('end stream');
  });
