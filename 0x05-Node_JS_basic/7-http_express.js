// 7-http_express.js
const express = require('express');
const fs = require('fs').promises;

const app = express();

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const studentDetails = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${studentDetails}`);
  } catch (error) {
    res.send(error.message);
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
