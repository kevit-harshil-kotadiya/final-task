require("dotenv").config();

const Config = {
  mongodb: {
    url: "mongodb://127.0.0.1:27017/college_api_test",
  },
  server: {
    port: 3002,
    logLevel: process.env.LOG_LEVEL || "all",
    alertLogLevel: process.env.ALERT_LOG_LEVEL || "error",
    webhookUrl: process.env.WEBHOOK_URL,
    env: process.env.NODE_ENV,
  },
};
export default Config;
