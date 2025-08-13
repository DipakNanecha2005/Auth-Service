import { JWT_KEY } from "../config/serverConfig.js";
import { userRepositoryInstance } from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
   * Creates a new user.
   * @param {{
   *  email: string
   *  password: string
   * }} data - Body object
   */
  async createUser(data) {
    try {
      const user = await this.#userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
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
      const user = await this.#userRepository.getByEmail(email);

      const isPasswordValid = this.#checkPassword(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("Incorrect password");
        error.statusCode = 400;
        throw error;
      }

      const token = this.#createToken({
        id: user.id,
        email: user.email,
      });
      return token;
    } catch (error) {
      throw error;
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
        const error = new Error("Invalid token");
        error.statusCode(401);
        throw error;
      }

      const user = await this.#userRepository.get(response.id);
      if (!user) {
        const error = new Error("No user with corresponding token exists.");
        error.statusCode(401);
        throw error;
      }
      return user.id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if the user is Admin
   * @param {number} userId - user id
   */
  async isAdmin(userId) {
    try {
      return this.#userRepository.isAdmin(userId);
    } catch (error) {
      throw error;
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
