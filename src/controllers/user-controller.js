import { UserService } from "../services/user-service.js";

/**
 * Register user
 * @route POST /api/v1/register
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @access Public
 */
export const create = async (req, res) => {
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      user,
      success: true,
      message: "Successfully created a user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot create user right now.",
      error: error.message,
      success: false,
    });
  }
};
