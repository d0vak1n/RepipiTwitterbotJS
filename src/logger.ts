import winston from "winston";
import { Logform } from "winston"; // Import Logform for type safety

const logger = winston.createLogger({
  level: "info", // Log only if info level or higher
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }), // Log stack traces
    winston.format.splat(),
    winston.format.printf((info: Logform.TransformableInfo) => {
      const timestampStr = String(info.timestamp);
      const levelStr = String(info.level);
      // Explicitly stringify info.message, as it can be an object (e.g., for metadata)
      const messageStr = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
      // Handle potentially undefined stack, ensuring it's a string
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      const stackStr = info.stack ? String(info.stack) : ''; 
      
      return `${timestampStr} ${levelStr}: ${messageStr}${stackStr ? ' - ' + stackStr : ''}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"], // Log errors to stderr
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

export default logger;
