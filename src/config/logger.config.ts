import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { serverConfig } from "./index";

const isProduction = serverConfig.NODE_ENV === "production";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "cyan",
  verbose: "magenta",
  debug: "green",
  silly: "grey",
});

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({
    stack: true,
  }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({
    stack: true,
  }),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",

  format: fileFormat,

  transports: [
    new winston.transports.Console({
      format: isProduction ? fileFormat : consoleFormat,
    }),

    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),

    new DailyRotateFile({
      level: "error",
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],

  exceptionHandlers: [
    new DailyRotateFile({
      filename: "logs/exceptions-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],

  rejectionHandlers: [
    new DailyRotateFile({
      filename: "logs/rejections-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],

  exitOnError: false,
});

export default logger;
