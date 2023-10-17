import { createLogger, transports, format } from 'winston';
import { WinstonChannelLogger } from '@kevit/winston-channel-logger';
import * as morgan from 'morgan';
import Config from '../config';


const winstonChannelLogger = new WinstonChannelLogger({
    format: format.uncolorize(),
    level:'info',
    platforms: [{
      webhookUrl: process.env.WEBHOOK_URL,
      token: null,
      platformName: 'ms-teams',
      channelId: null
    }],
  });
  
  
  const logger = createLogger({
      transports: [new transports.Console({  level:'info'}), winstonChannelLogger],
      format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
          }),
      ),
  });

  const morganformat =
  Config.server.env === 'dev'
    ? 'dev'
    : ':remote-addr ":user-agent" - :method :url :status :response-time ms - :res[content-length]';
export const morganInstance = morgan(morganformat, {
  stream: {
    write: (str) => {
      if (str && str.split('?')[1]) {
        if (str.split('?')[1].split('=')[0] !== 'watermark') {
          logger.debug(str);
        }
      } else {
        logger.debug(str);
      }
    },
  },
});

export const log = logger;
