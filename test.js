const { store } = require('./store');
const fs = require('fs');

const { argv } = process;
const args = argv.slice(2);

const chunkArrayInTwos = arr => {
  const chunked = [];

  for (let i = 0; i < arr.length; i = i + 2) {
    chunked.push(arr.slice(i, i + 2));
  }

  return chunked;
}

if (args.length === 1 && args[0].split('.').pop() === 'txt') {
  fs.readFile(args[0], 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    if (data.length) {
      const items = data.split('\n');
      console.log('item inputs from textfile', items);
    }
  })
} else {
  const items = chunkArrayInTwos(args).map(v => v.join(' '));
  console.log('item inputs from cmd', items);
}