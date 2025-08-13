/**
 * Validates user body object for Register and LogIn.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const validateUserAuth = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required.",
      success: false,
    });
  }

  next();
};

/**
 * Validates body object for isAdmin route.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const validateIsAdminRequest = async (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      message: "User id is required.",
      success: false,
    });
  }

  next();
};
