// 5-http.js
const http = require('http');
const url = require('url');
const fs = require('fs').promises;

const countStudents = (path) => fs.readFile(path, 'utf8')
  .then((data) => {
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1); // Remove the header line

    const totalStudents = students.length;
    let result = `Number of students: ${totalStudents}\n`;

    const fields = {};
    students.forEach((student) => {
      const [firstname, , , field] = student.split(',').map((item) => item.trim());
      if (field) {
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    });

    for (const [field, names] of Object.entries(fields)) {
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }

    return result.trim();
  })
  .catch(() => {
    throw new Error('Cannot load the database');
  });

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (path === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((studentDetails) => {
        res.end(studentDetails);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
