import Student from "../student/student.model";
import jwt = require("jsonwebtoken");
/**
 * Controller for managing student-related operations.
 */
class StudentController {
  /**
   * Take attendance for the logged-in student.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function in the middleware chain.
   */
  async takeAttendence(req, res, next) {
    try {
      const student = req.user;

      const currentDate = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

      if (!student.attendance.includes(currentDate)) {
        // If not, add the date to the array

        student.attendance.push(currentDate);
 
        await student.save();
        return res.send("Attendence Recorded!");
      }

      return res.status(409).send("Attendence already recorded!!");
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   * Handle student login by validating credentials and generating a JWT token.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function in the middleware chain.
   */
  async studentLogin(req, res, next) {
    try {
      const {studentId,password} = req.body;


      if (!studentId || !password) {
        return res.status(400).send("Email or Password not present");
      }

      const student = await Student.findOne({ studentId });

      if (student) {
        const match = password === student.password;

        if (match) {
          const token = jwt.sign(
            { _id: student._id.toString(), studentId: student.studentId },
            process.env.KEY,
          );

          student.tokens.push({ token });
          await student.save();
          return res.status(200).send({ student, token });
        }
        return res.status(401).send("Invalid Credentials");
      }
      return res.status(404).send("User not found");
    } catch (err) {
      res.status(500).send(err);
    }
  }
  /**
   * Handle student logout by removing the provided token from the user's tokens array.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  async studentLogout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });



      await req.user.save();

      res.send(req.user);
    } catch (e) {
      res.status(500).send();
    }
  }
}
export default StudentController;
