// full_server/controllers/StudentsController.js
import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase(process.argv[2]);
      let responseText = 'This is the list of our students\n';

      const sortedFields = Object.keys(students).sort((a, b) => a.toLowerCase()
        .localeCompare(b.toLowerCase()));
      sortedFields.forEach((field) => {
        const studentList = students[field].join(', ');
        responseText += `Number of students in ${field}: ${students[field].length}. List: ${studentList}\n`;
      });

      res.status(200).send(responseText.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(process.argv[2]);
      const studentList = students[major].join(', ');
      res.status(200).send(`List: ${studentList}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
