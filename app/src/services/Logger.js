// Logging utility for development and debugging
class Logger {
  static isDevelopment = __DEV__;

  // Debug level logging - only in development
  static debug(message, ...args) {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  // Info level logging - only in development
  static info(message, ...args) {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  // Warning level logging - always shown
  static warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  // Error level logging - always shown
  static error(message, ...args) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  // Auth specific logging
  static auth(message, ...args) {
    if (this.isDevelopment) {
      console.log(`[AUTH] ${message}`, ...args);
    }
  }

  // OTP specific logging
  static otp(message, ...args) {
    if (this.isDevelopment) {
      console.log(`[OTP] ${message}`, ...args);
    }
  }

  // Network logging
  static network(message, ...args) {
    if (this.isDevelopment) {
      console.log(`[NETWORK] ${message}`, ...args);
    }
  }
}

export default Logger;
