const readline = require('readline');

function displayMessage(username) {
  console.log(`Your name is: ${username}`);
}

console.log('Welcome to Holberton School, what is your name?');

if (process.stdin.isTTY) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('', (answer) => {
    displayMessage(answer);
    rl.close();
  });

  rl.on('close', () => {
    console.log('This important software is now closing');
    process.exit(0);
  });
} else {
  process.stdin.setEncoding('utf8');
  let input = '';

  process.stdin.on('data', (data) => {
    input += data;
  });

  process.stdin.on('end', () => {
    const name = input.trim();
    displayMessage(name);
    console.log('This important software is now closing');
    process.exit(0);
  });
}
