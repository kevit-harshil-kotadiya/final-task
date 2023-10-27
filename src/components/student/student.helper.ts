import Student from "./student.model";
/**
 * Helper class for calculating student attendance.
 */
class Attendence {
  private even: number = 95;
  private odd: number = 136;
  /**
   * Calculate the student's attendance based on the current semester and the number of attendance records.
   *
   * @param student - The student object for which attendance is being calculated.
   * @returns The calculated attendance percentage.
   */
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
