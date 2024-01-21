const fs = require('fs');
const readLine = require('readline');
//
const rlInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//
rlInterface.question('Write your text: ...', (input) => {
  fs.writeFile(__dirname + '/text.txt', input, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(
        'Your text saved in text.txt Press ctrl+c for exit command line ',
      );
    }
  });
});
