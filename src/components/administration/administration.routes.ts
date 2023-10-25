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
      "/addadmin",
      authentication,
      adminAuthorization,
      this.adminController.addAdmin,
    );

    this.router.post(
      "/addstudent",
      authentication,
      staffAuthorization,
      this.adminController.addStudent,
    );

    this.router.put(
      "/adddepartmentdata",
      authentication,
      adminAuthorization,
      this.adminController.addDepartment,
    );

    this.router.post(
      "/addstaff",
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
      "/liststudents",
      authentication,
      staffAuthorization,
      this.adminController.listStudents,
    );

    this.router.get(
      "/absentstudents",
      authentication,
      staffAuthorization,
      this.adminController.absentStudents,
    );

    this.router.get(
      "/lessattendance",
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
      "/updatestudent",
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
