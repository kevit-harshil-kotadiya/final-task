import { createLogger, transports, format } from "winston";
import { WinstonChannelLogger } from "@kevit/winston-channel-logger";

import Config from "../config";

// Initialize a WinstonChannelLogger for sending logs to Microsoft Teams.
const winstonChannelLogger = new WinstonChannelLogger({
  format: format.uncolorize(),
  level: "info",
  platforms: [
    {
      webhookUrl: process.env.WEBHOOK_URL,
      token: null,
      platformName: "ms-teams",
      channelId: null,
    },
  ],
});

// Create a Winston logger with custom formatting and log transports.
const logger = createLogger({
  transports: [new transports.Console({ level: "info" }), winstonChannelLogger],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

// Determine the format for Morgan request logging based on the environment.
const morganformat =
  Config.server.env === "dev"
    ? "dev"
    : ':remote-addr ":user-agent" - :method :url :status :response-time ms - :res[content-length]';

// Export the logger and the Morgan instance.
export const log = logger;
