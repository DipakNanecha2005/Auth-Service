import { NODE_ENV } from "../config/serverConfig.js";

class Log {
  #isDev = NODE_ENV === "development";

  info(...args) {
    if (this.#isDev) {
      console.log(...args);
    }
  }

  error(...args) {
    if (this.#isDev) {
      console.error(...args);
    }
  }
}

const logInstance = new Log();

export { logInstance as Log };
