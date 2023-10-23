import Student from "../student/student.model";
import jwt = require("jsonwebtoken");

class StudentController {
  async takeAttendence(req, res, next) {
    try {
      const student = req.user;
      console.log(student);
      const currentDate = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

      if (!student.attendance.includes(currentDate)) {
        // If not, add the date to the array

        student.attendance.push(currentDate);
        console.log(student.attendance);
        await student.save();
        return res.send("Attendence Recorded!");
      }

      return res.status(409).send("Attendence already recorded!!");
    } catch (e) {
      res.status(500).send();
    }
  }

  async studentLogin(req, res, next) {
    try {
      const studentId = req.body.studentId;
      const password = req.body.password;

      if (!studentId || !password) {
        return res.status(400).send("Email or Password not present");
      }

      const student = await Student.findOne({ studentId });

      if (student) {
        const match = password == student.password;

        if (match) {
          const token = jwt.sign(
            { _id: student._id.toString(), studentId: student.studentId },
            "TEMPKEY",
          );
          console.log(token);
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

  async studentLogout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });

      console.log(req.user);

      await req.user.save();

      res.send(req.user);
    } catch (e) {
      res.status(500).send();
    }
  }
}
export default StudentController;
