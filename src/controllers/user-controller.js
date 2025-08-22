import { UserService } from "../services/user-service.js";
import { Log } from "../utils/Log.js";

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
      data: user,
      success: true,
      error: {},
      message: "Successfully registered a user",
    });
  } catch (error) {
    Log.error(error);
    res.status(error.statusCode).json({
      message: error.message,
      error: error.explanation,
      data: {},
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
      data: result,
      success: true,
      error: {},
      message: "Successfully logged in a user",
    });
  } catch (error) {
    Log.error(error);
    res.status(error.statusCode).json({
      message: error.message,
      error: error.explanation,
      data: {},
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
      data: response,
      success: true,
      error: {},
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    Log.error(error);
    res.status(error.statusCode).json({
      message:
        error.message ||
        "Something went wrong. Error in isAuthenticated controller.",
      error: error.explanation,
      data: {},
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
      data: response,
      success: true,
      error: {},
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    Log.error(error);
    res.status(error.statusCode).json({
      message:
        error.message || "Something went wrong. Error in isAdmin controller.",
      error: error.explanation,
      data: {},
      success: false,
    });
  }
};

/**
 * Get user info
 * @route GET /api/v1/user-info
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @access Authorized
 */
export const getUserInfo = async (req, res) => {
  try {
    // const user = await UserService.getUserInfo()
  } catch (error) {
    Log.error(error);
    res.status(error.statusCode).json({
      message:
        error.message ||
        "Something went wrong. Error in getUserInfo controller.",
      error: error.explanation,
      data: {},
      success: false,
    });
  }
};
