// 3-read_file_async.js
const fs = require('fs').promises;

function countStudents(path) {
  return  fs.readFile(path, 'utf8')
    .then((data) => {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const students = lines.slice(1);
        const totalStudents = students.length;
        console.log(`Number of students: ${totalStudents}`);

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
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        }
    })
    .catch(() => {
        throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
