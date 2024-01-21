const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('Enter your text: ');
rl.prompt();

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }
  fs.writeFile(filePath, input + '\n', { flag: 'a' }, function (error) {
    if (error) return console.log(error);
  });
  rl.prompt();
});

rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
