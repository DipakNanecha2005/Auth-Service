import { AppError } from "./App-Error.js";

/**
 * Custom validation error handler class.
 * @extends AppError - {@link AppError}
 */
export class ValidationError extends AppError {
  /**
   * ValidationError constructor.
   * @param {Error} error - Error Object
   */
  constructor(error) {
    let explanation = error.errors.reduce((prev, current) => {
      prev.push({
        message: current.message,
        type: current.type,
      });
      return prev;
    }, []);

    super(
      "ValidationError",
      "Not able to validate data send in request.",
      explanation,
      400
    );
  }
}
