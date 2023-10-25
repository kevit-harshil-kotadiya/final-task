import * as http from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
// Load environment variables from a .env file
dotenv.config();

// Import controllers (route handlers), and utility functions
import ApplicationConfig from "./application.routes";
import Config from "./config";
import { log } from "./utils/winston-logger";
// Define the MongoDB connection URL and server port from configuration
const mongoUrl: string = Config.mongodb.url;
const PORT: string | number = Config.server.port;
// Create a class named "App"
class App {
  public app: express.Application;

  constructor() {
    // Initialize the Express application and create an HTTP server
    this.app = express();
    const server = http.createServer(this.app);

    // Start the server and log that it's running
    server.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
      console.log("Server is running on port", PORT);
    });
        // Configure middleware and set up MongoDB
    this.config();
    this.mongoSetup();
  }

  /**
   * Configure the Express application with middleware, routes, and error handling.
   */
  private config(): void {
    // Enable CORS with specific options
    this.app.use(
      cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Origin",
          " X-Requested-With",
          " Content-Type",
          " Accept ",
          " Authorization",
          "x-ms-bot-agent",
          "User-Agent",
        ],
        credentials: true,
      }),
    );
    // Parse JSON requests with a 50MB limit
    this.app.use(bodyParser.json({ limit: "50mb" }));
    // Parse URL-encoded requests with a 50MB limit and extended support
    this.app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      }),
    );


    // Register application routes
    ApplicationConfig.registerRoute(this.app);
  }

  /**
   * Establishes MongoDB connection
   */
  private mongoSetup(): void {
    // Log when connected to the database
    mongoose.connection.on("connected", () => {
      log.info("DATABASE - Connected");
    });
    // Log database errors
    mongoose.connection.on("error", (err) => {
      log.error(`DATABASE - Error:${err}`);
    });
    // Log when disconnected and attempt reconnection
    mongoose.connection.on("disconnected", () => {
      log.warn("DATABASE - disconnected  Retrying....");
    });
    // Configure MongoDB connection options
    const dbOptions = {
      maxPoolSize: 5,
      useNewUrlParser: true,
    };
    // Connect to the MongoDB database using the provided URL and options
    mongoose.connect(mongoUrl, dbOptions);
  }
}
// Create an instance of the "App" class to start the application
new App();
