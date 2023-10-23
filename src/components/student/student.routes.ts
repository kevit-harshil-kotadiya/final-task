import { Router } from "express";
// import authorization from '../../utils/auth';
import studentAuthentication from "../../utils/studentAuthentication";

import StudentController from "../student/student.controller";

class StudentRouter {
  public router: Router;

  studentController = new StudentController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/login", this.studentController.studentLogin);

    this.router.post(
      "/attendence",
      studentAuthentication,
      this.studentController.takeAttendence,
    );

    this.router.post(
      "/logout",
      studentAuthentication,
      this.studentController.studentLogout,
    );

    this.router.get("", (req, res) => {
      res.status(200).send({ message: "Sagar" });
    });
  }
}

export default new StudentRouter().router;
