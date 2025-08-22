import { AppError } from "../utils/errors/App-Error.js";
import { ClientError } from "../utils/errors/Client-Error.js";
import { ValidationError } from "../utils/errors/Validation-Error.js";
const { User, Role } = (await import("../models/index.js")).default;

/**
 * This repository class interact with the User model.
 */
class UserRepository {
  /**
   * Fetches a user from the database by its ID.
   * @param {number | string} userId - User id
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "email"],
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid user ID in the request.",
          "No user record found with the provided ID.",
          404
        );
      }

      return user;
    } catch (error) {
      if (error instanceof ClientError) {
        throw error;
      }

      throw new AppError(
        "RepositoryError",
        "Failed to fetch user.",
        error.message,
        500
      );
    }
  }

  /**
   * Fetches a user from the database by its email.
   * @param {string} userEmail - User email
   */
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email id sent in the request.",
          `Please check the email id again, No record of email ${userEmail} present.`,
          404
        );
      }

      return user;
    } catch (error) {
      if (error instanceof ClientError) {
        throw error;
      }

      throw new AppError(
        "RepositoryError",
        "Failed to fetch user by email.",
        error.message,
        500
      );
    }
  }

  /**
   * Inserts a new user record into the database.
   * @param {{
   *  email: string,
   *  password: string
   * }} data - User creation payload
   */
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }

      throw new AppError(
        "RepositoryError",
        "Failed to create user.",
        error.message,
        500
      );
    }
  }

  /**
   * Updates a user record by its ID.
   * @param {number | string} userId - User ID
   * @param {{
   *  email?: string,
   *  password?: string
   * }} data - User updation payload
   */
  async updateUser(userId, data) {
    try {
      const [updated] = await User.update(data, {
        where: {
          id: userId,
        },
      });
      if (!updated) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid user id in the request or no update occurred.",
          "Verify the user ID and ensure update data is valid.",
          404
        );
      }

      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ValidationError(error);
      }
      if (error instanceof ClientError) {
        throw error;
      }

      throw new AppError(
        "RepositoryError",
        "Failed to update user.",
        error.message,
        500
      );
    }
  }

  /**
   * Deletes a user record by its ID.
   * @param {number | string} userId - User id
   */
  async deleteUser(userId) {
    try {
      const deleted = await User.destroy({
        where: {
          id: userId,
        },
      });
      if (!deleted) {
        throw new ClientError(
          "AttributeNotFound",
          "User not found or already deleted.",
          "Please verify the user ID.",
          404
        );
      }

      return deleted;
    } catch (error) {
      if (error instanceof ClientError) {
        throw error;
      }

      throw new AppError(
        "RepositoryError",
        "Failed to delete user.",
        error.message,
        500
      );
    }
  }

  /**
   * Check if user is Admin
   * @param {number | string} userId - user id
   */
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "User not found.",
          "Cannot determine role. User does not exist.",
          404
        );
      }

      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      if (!adminRole) {
        throw new AppError(
          "RepositoryError",
          "Admin role not found.",
          "Please ensure the roles table is correctly set up.",
          500
        );
      }

      return user.hasRole(adminRole);
    } catch (error) {
      if (error instanceof ClientError || error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "RepositoryError",
        "Failed to determine user role.",
        error.message,
        500
      );
    }
  }
}

/**
 * Singleton instance of {@link UserRepository}
 *
 * Handles all data-access-level operations
 */
export const userRepositoryInstance = new UserRepository();
