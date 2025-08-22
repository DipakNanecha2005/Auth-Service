import { AppError } from "./App-Error.js";

/**
 * Custom client error handler class.
 * @extends AppError {@link AppError}
 */
export class ClientError extends AppError {
  /**
   * ClientError constructor.
   * @param {string} name - Error type or name.
   * @param {string} message - Error message.
   * @param {string} explanation - Detailed explanation of the error.
   * @param {number} statusCode - HTTP status code.
   */
  constructor(name, message, explanation, statusCode) {
    super(name, message, explanation, statusCode);
  }
}
