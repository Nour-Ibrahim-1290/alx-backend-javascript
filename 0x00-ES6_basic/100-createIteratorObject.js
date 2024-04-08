export default function createIteratorObject(report) {
    function* iterateEmployees() {
      for (let department in report.allEmployees) {
        for (let employee of report.allEmployees[department]) {
          yield employee;
        }
      }
    }
    return iterateEmployees();
  }