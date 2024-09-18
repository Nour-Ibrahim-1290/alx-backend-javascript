// test-stdin.js
const { spawn } = require('child_process');

const child = spawn('node', ['./1-stdin.js']);

child.stdin.write('John\n');
child.stdin.end();

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});