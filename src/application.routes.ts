import { Application } from "express";
import AdministrationRoutes from "./components/administration/administration.routes";
import StudentRoutes from "./components/student/student.routes";
/**
 * Class for configuring and registering routes in the Express application.
 */
export default class ApplicationConfig {
  /**
   * Register routes for students and administration.
   * @param {Application} app - The Express application to which routes are added.
   */
  public static registerRoute(app: Application) {
    // Register routes for students under the "/student" path
    app.use("/student", StudentRoutes);
    // Register routes for administration under the "/administration" path
    app.use("/administration", AdministrationRoutes);
  }
}
