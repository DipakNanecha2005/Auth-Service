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

/**
 * Login user
 * @route POST /api/v1/login
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @access Public
 */
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.logIn(email, password);

    res.status(200).json({
      token: result,
      success: true,
      message: "Successfully login a user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot login user right now.",
      error: error.message,
      success: false,
    });
  }
};

/**
 * Check if the user is authenticated
 * @route GET /api/v1/isAuthenticated
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @access Public
 */
export const isAuthenticated = async (req, res) => {
  try {
    if (!req.headers?.authorization?.startsWith("Bearer ")) {
      return res.json(400).json({
        message: "Invalid token format",
        success: false,
      });
    }
    const token = req.headers?.authorization?.split(" ")[1];
    const response = await UserService.isAuthenticated(token);

    res.status(200).json({
      response,
      success: true,
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Error in isAuthenticated controller.",
      error: error.message,
      success: false,
    });
  }
};

/**
 * Check if the user is authenticated
 * @route GET /api/v1/isAuthenticated
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @access Public
 */
export const isAdmin = async (req, res) => {
  try {
    const response = await UserService.isAdmin(req.body.id);

    res.status(200).json({
      response,
      success: true,
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Error in isAdmin controller.",
      error: error.message,
      success: false,
    });
  }
};
