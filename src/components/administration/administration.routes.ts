import { Router } from "express";

import AdminController from "./administration.controller";

import authentication from "../../utils/adminAuthentication";

import adminAuthorization from "../../utils/adminAuthorization";

import staffAuthorization from "../../utils/staffAuthorization";
/**
 * Router class for handling administrative routes.
 */
class AdminRouter {
  public router: Router;

  adminController = new AdminController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  /**
   * Initialize routes for the administration router.
   */
  initializeRoutes() {
    this.router.post("/login", this.adminController.loginAdministration);

    this.router.post(
      "/add-admin",
      authentication,
      adminAuthorization,
      this.adminController.addAdmin,
    );

    this.router.post(
      "/add-student",
      authentication,
      staffAuthorization,
      this.adminController.addStudent,
    );

    this.router.put(
      "/add-departmentdata",
      authentication,
      adminAuthorization,
      this.adminController.addDepartment,
    );

    this.router.post(
      "/add-staff",
      authentication,
      adminAuthorization,
      this.adminController.addStaff,
    );

    this.router.post(
      "/logout",
      authentication,
      this.adminController.logoutAdministration,
    );

    this.router.get(
      "/list-students",
      authentication,
      staffAuthorization,
      this.adminController.listStudents,
    );

    this.router.get(
      "/absent-students",
      authentication,
      staffAuthorization,
      this.adminController.absentStudents,
    );

    this.router.get(
      "/less-attendance",
      authentication,
      staffAuthorization,
      this.adminController.lessAttendance,
    );

    this.router.get(
      "/departments",
      authentication,
      adminAuthorization,
      this.adminController.getDepartments,
    );

    this.router.put(
      "/update-student",
      authentication,
      staffAuthorization,
      this.adminController.updateStudent,
    );

    this.router.get("", (req, res) => {
      res.status(200).send({ message: "Sagar" });
    });
  }
}

export default new AdminRouter().router;
