import { Router } from "express";
// import authorization from '../../utils/auth';
import studentAuthentication from "../../utils/studentAuthentication";

import StudentController from "../student/student.controller";
/**
 * Router class for handling student-related routes.
 */
class StudentRouter {
  public router: Router;

  studentController = new StudentController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  /**
   * Initialize routes for the student router.
   */
  initializeRoutes() {
        // Route for student login
    this.router.post("/login", this.studentController.studentLogin);
    // Route for taking attendance (requires student authentication)
    this.router.post(
      "/attendence",
      studentAuthentication,
      this.studentController.takeAttendence,
    );
    // Route for student logout (requires student authentication)
    this.router.post(
      "/logout",
      studentAuthentication,
      this.studentController.studentLogout,
    );
    // Default route for testing
    this.router.get("", (req, res) => {
      res.status(200).send({ message: "Sagar" });
    });
  }
}
// Export an instance of the StudentRouter class
export default new StudentRouter().router;
