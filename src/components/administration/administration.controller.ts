import Student from "../student/student.model";
import Administration from "./administration.model";
import jwt = require("jsonwebtoken");
import studenthelper from "../student/student.helper";
import Department from "../department/department.model";
/**
 * Controller class for handling administrative operations.
 */
class AdminController {
  /**
   * Authenticate an administrator and generate a JWT token.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing an administrator and token on success.
   */
  async loginAdministration(req, res, next) {
    try {
      const { administratorId, password } = req.body;

      if (!administratorId || !password) {
        return res.status(400).send("Email or Password not present");
      }

      const administrator = await Administration.findOne({ administratorId });

      if (administrator) {
        const match = password === administrator.password;

        if (match) {
          const token = jwt.sign(
            {
              _id: administrator._id.toString(),
              administratorId: administrator.administratorId,
            },
            process.env.KEY,
          );

          administrator.tokens.push({ token });
          await administrator.save();
          return res.status(200).send({ administrator, token });
        }
        return res.status(401).send("Invalid Credentials");
      }
      return res.status(404).send("User not found");
    } catch (err) {
      res.status(500).send(err);
    }
  }
  /**
   * Add a staff member to the administration.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing data of the added staff.
   */
  async addStaff(req, res, next) {
    try {
      const staffData = req.body;

      const exist = await Administration.findOne({
        administratorId: staffData.administratorId,
      });

      if (exist) {
        return res.status(409).send("Staff already exist");
      }

      const staff = await Administration.create(staffData);

      return res.status(200).send({ data: staff });
    } catch (err) {
      return next(err);
    }
  }
  /**
   * Add an administrator to the administration.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing data of the added administrator.
   */
  async addAdmin(req, res, next) {
    try {
      const adminObject = req.body;

      const exist = await Administration.findOne({ profile: "admin" });

      if (exist) {
        return res.status(409).send("Admin already exist");
      }

      const admin = await Administration.create(adminObject);

      return res.status(200).send({ data: admin });
    } catch (err) {
      return next(err);
    }
  }
  /**
   * Add a new department.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Response} A success message indicating department addition or update.
   */
  async addDepartment(req, res) {
    try {
      const { year, ...dataToAdd } = req.body;

      const department = await Department.findOne({ year });
      if (department) {
        await department.updateOne(dataToAdd, { new: true });

        return res.send("Department has been updated");
      }

      const newDeparment = new Department(req.body);

      await newDeparment.save();

      return res.send("New Department Added successfully");
    } catch (err) {
      res.status(500);
    }
  }
  /**
   * Add a new student to the system.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing data of the added student.
   */
  async addStudent(req, res, next) {
    try {
      const studentObject = req.body;

      const exist = await Student.findOne({
        studentId: studentObject.studentId,
      });

      if (exist) {
        return res.status(409).json({ error: "Student already exists" });
      }

      const student = await Student.create(studentObject);

      await Department.updateOne(
        {
          year: studentObject.batch,
          "branches.name": studentObject.department,
        },
        {
          $inc: { "branches.$.totalStudents": 1 }, // Increment totalStudents by 1.
        },
      );

      return res.status(200).send({ data: student });
    } catch (err) {
      return next(err);
    }
  }
  /**
   * Retrieve a list of students by year and department.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing a list of students.
   */
  async listStudents(req, res, next) {
    const data = await Student.aggregate([
      {
        $group: {
          _id: { year: "$batch", department: "$department" },
          totalStudents: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.year",
          totalStudents: { $sum: "$totalStudents" },
          branches: {
            $push: { k: "$_id.department", v: "$totalStudents" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          totalStudents: 1,
          branches: { $arrayToObject: "$branches" },
        },
      },
    ]);

    if (data.length === 0) {
      return res.status(404).send("no data found");
    }

    return res.send(data);
  }
  /**
   * Retrieve a list of absent students on a specific date.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response containing a list of absent students.
   */
  async absentStudents(req, res, next) {
    const data = [];

    const date: string = req.body.date;

    if (new Date(date) > new Date()) {
      return res.send("No Data Found!");
    }

    const students = await Student.find({});

    for (const student of students) {
      if (!student.attendance.includes(date)) {
        const stData = {
          name: student.name,
          Id: student.studentId,
        };
        data.push(stData);
      }
    }

    if (data.length === 0) {
      return res.send("No Student Absent");
    }

    res.send(data);
  }
  /**
   * Retrieve a list of students with less than 75% attendance in a specific semester.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Response} The response containing a list of students with low attendance.
   */
  async lessAttendance(req, res) {
    const sem = parseInt(req.body.sem);

    const students = await Student.find({ currentSem: { $gte: sem } });

    const data = [];

    for (const student of students) {
      if (student.currentSem === sem) {
        const attendance = await studenthelper.calculateAttendance(student);

        if (parseInt(attendance) < 75) {
          const studentWithLessAttedance = {
            name: student.name,
            studentId: student.studentId,
            attendance,
          };

          data.push(studentWithLessAttedance);
        }
      }

      if (student.currentSem > sem) {
        const foundSemAttendence = student.semAttendance.find(
          (item) => item.sem === sem,
        );

        if (parseInt(foundSemAttendence.attendance) < 75) {
          const studentWithLessAttedance = {
            name: student.name,
            studentId: student.studentId,
            attendance: foundSemAttendence.attendance,
          };

          data.push(studentWithLessAttedance);
        }
      }
    }

    res.send(data);
  }
  /**
   * Get a list of departments for a given year.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Response} The response containing department information.
   */
  async getDepartments(req, res) {
    const year = req.body.year;

    if (!year || typeof year !== "number") {
      return res.status(400).send("Invalid year provided in the request.");
    }

    try {
      const data = await Department.aggregate([
        {
          $match: { year }, // Filter by the desired batch year (2020 in this case)
        },
        {
          $unwind: "$branches",
        },
        {
          $group: {
            _id: "$year",
            branches: {
              $push: {
                name: "$branches.name",
                totalStudents: "$branches.totalStudents",
                totalStudentsIntake: "$branches.totalStudentsIntake",
                availableIntake: {
                  $subtract: [
                    "$branches.totalStudentsIntake",
                    "$branches.totalStudents",
                  ],
                },
              },
            },
            totalStudents: { $sum: "$branches.totalStudents" },
            totalStudentsIntake: { $sum: "$branches.totalStudentsIntake" },
          },
        },
        {
          $project: {
            _id: 0,
            batch: "$_id",
            totalStudents: 1,
            totalStudentsIntake: 1,
            availableIntake: {
              $subtract: ["$totalStudentsIntake", "$totalStudents"],
            },
            branches: {
              $arrayToObject: {
                $map: {
                  input: "$branches",
                  as: "b",
                  in: { k: "$$b.name", v: "$$b" },
                },
              },
            },
          },
        },
      ]);

      if (data.length === 0) {
        return res.status(404).send("No Data Found!");
      }

      res.send(data);
    } catch (error) {
      res.status(500).send("An error occurred while processing the request.");
    }
  }
  /**
   * Update student information, including attendance data.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Response} The response containing the updated student data.
   */
  async updateStudent(req, res) {
    try {
      const { studentId, ...updateBody } = req.body;

      if (updateBody.hasOwnProperty("currentSem")) {
        const student = await Student.findOne({ studentId });

        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }

        // Calculate attendance only if 'currentSem' is being updated
        const newCurrentSem = updateBody.currentSem;
        if (newCurrentSem !== student.currentSem) {
          const attendance = await studenthelper.calculateAttendance(student);
          const semAttendanceToPush = {
            sem: newCurrentSem,
            attendance,
          };

          student.semAttendance.push(semAttendanceToPush);
          student.attendance = [];
          await student.save();
        }

        // Update the student
        await student.updateOne(updateBody);

        // Fetch the updated student
        const updatedStudent = await Student.findOne({ studentId });

        res.send(updatedStudent);
      } else {
        // If 'currentSem' is not being updated, proceed with the regular update
        const updatedStudent = await Student.findOneAndUpdate(
          { studentId },
          updateBody,
          { new: true },
        );
        if (!updatedStudent) {
          return res.status(404).json({ message: "Student not found" });
        }

        res.send(updatedStudent);
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  /**
   * Log out an administrator by removing their token.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {Response} The response indicating successful logout.
   */
  async logoutAdministration(req, res, next) {
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
export default AdminController;
