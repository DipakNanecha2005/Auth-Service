import { JWT_KEY } from "../config/serverConfig.js";
import { userRepositoryInstance } from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ServiceError } from "../utils/errors/Service-Error.js";
import { ClientError } from "../utils/errors/Client-Error.js";
import e from "express";

/**
 * Service class for User operations.
 *
 * Handles all business logic, validation
 */
class UserService {
  // private field
  #userRepository;

  constructor() {
    this.#userRepository = userRepositoryInstance;
  }

  /**
   * Get User info
   * @param {number | string} userId - user id
   */
  async getUserInfo(userId) {
    try {
      const user = await this.#userRepository.getUserById(userId);
      return user;
    } catch (error) {
      if (["AttributeNotFound", "RepositoryError"].includes(error.name)) {
        throw error;
      }

      throw new ServiceError(
        "Cannot get user data.",
        `Somethiing went wrong in service layer: ${error.message}`
      );
    }
  }

  /**
   * Creates a new user.
   * @param {{
   *  email: string
   *  password: string
   * }} data - Body object
   */
  async createUser(data) {
    try {
      const user = await this.#userRepository.createUser(data);
      return user;
    } catch (error) {
      if (
        ["SequelizeValidationError", "RepositoryError"].includes(error.name)
      ) {
        throw error;
      }

      throw new ServiceError(
        "Cannot create user.",
        `Somethiing went wrong in service layer: ${error.message}`
      );
    }
  }

  /**
   * Helper function to create a JWT token.
   * @param {{
   *  id: number
   *  email: string
   * }} user - Payload
   */
  #createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "24h" });
      return token;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Helper function to verify the JWT token
   * @param {string} token - JWT token
   */
  #verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);

      return decoded;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Helper function to check password is valid
   * @param {string} plainTextPassword - User entered password
   * @param {string} hashedPassword - Hashedpassword stored in database
   */
  #checkPassword(plainTextPassword, hashedPassword) {
    try {
      return bcrypt.compareSync(plainTextPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Log in user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async logIn(email, password) {
    try {
      const user = await this.#userRepository.getUserByEmail(email);

      const isPasswordValid = this.#checkPassword(password, user.password);
      if (!isPasswordValid) {
        throw new ClientError(
          "InvalidAttribute",
          "Invalid password",
          "Invalid password",
          400
        );
      }

      const token = this.#createToken({
        id: user.id,
        email: user.email,
      });
      return token;
    } catch (error) {
      if (
        ["AttributeNotFound", "RepositoryError", "InvalidAttribute"].includes(
          error.name
        )
      ) {
        throw error;
      }

      throw new ServiceError(
        "Cannot login user",
        `Somethiing went wrong in service layer: ${error.message}`
      );
    }
  }

  /**
   * Check if the user is authenticated
   * @param {string} token - JWT token
   */
  async isAuthenticated(token) {
    try {
      const response = this.#verifyToken(token);
      if (!response) {
        throw new ClientError(
          "NotAuthorized",
          "Invalid token",
          "Invalid token or token expired.",
          401
        );
      }

      const user = await this.#userRepository.getUserById(response.id);

      return user.id;
    } catch (error) {
      if (
        ["AttributeNotFound", "RepositoryError", "NotAuthorized"].includes(
          error.name
        )
      ) {
        throw error;
      }

      throw new ServiceError(
        "Something went wrong.",
        `Somethiing went wrong in isAuthenticated service layer: ${error.message}`
      );
    }
  }

  /**
   * Check if the user is Admin
   * @param {number | string} userId - user id
   */
  async isAdmin(userId) {
    try {
      return this.#userRepository.isAdmin(userId);
    } catch (error) {
      if (["AttributeNotFound", "RepositoryError"].includes(error.name)) {
        throw error;
      }

      throw new ServiceError(
        "Something went wrong.",
        `Somethiing went wrong in isAdmin service layer: ${error.message}`
      );
    }
  }
}

/**
 * Singleton instance of {@link UserService}.
 *
 * Provides the service layer methods to handle User operations.
 */
const UserServiceinstance = new UserService();

export default UserService;
export { UserServiceinstance as UserService };
