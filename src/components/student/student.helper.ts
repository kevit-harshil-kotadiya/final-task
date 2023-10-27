import Student from "./student.model";

class Attendence {
  private even: number = 95;
  private odd: number = 136;

  async calculateAttendance(student) {
    let attendance: number = 0;

    if (parseInt(student.currentSem) % 2 === 0) {
      attendance = (student.attendance.length / this.even) * 100;
    }
    if (parseInt(student.currentSem) % 2 === 1) {
      attendance = (student.attendance.length / this.odd) * 100;
    }

    return attendance.toFixed(2);
  }
}

export default new Attendence();
