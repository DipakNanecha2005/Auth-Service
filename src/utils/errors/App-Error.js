/**
 * Custom error handler class.
 * @extends Error
 */
export class AppError extends Error {
  /**
   * AppError constructor.
   * @param {string} [name] - Error type or name.  Default: "Server Error"
   * @param {string} [message] - Error message.  Default: "Something went wrong."
   * @param {string | any[]} [explanation] - Detailed explanation of the error.  Default: "Something went wrong."
   * @param {number} [statusCode] - HTTP status code.  Default: 500
   */
  constructor(
    name = "Server Error",
    message = "Something went wrong.",
    explanation = "Something went wrong.",
    statusCode = 500
  ) {
    super();
    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}
