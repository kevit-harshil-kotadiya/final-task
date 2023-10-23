import { Application } from "express";
import AdministrationRoutes from "./components/administration/administration.routes";
import StudentRoutes from "./components/student/student.routes";


export default class ApplicationConfig {
  public static registerRoute(app: Application) {

    app.use("/student", StudentRoutes);

    app.use("/administration", AdministrationRoutes);
  }
}
