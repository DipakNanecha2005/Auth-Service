import db from "../models/index.js";
const { User } = db;

/**
 * This repository class interact with the User model
 */
class UserRepository {
  /**
   * Fetches a user from the database by its ID.
   * @param {number} userId - User id
   */
  async get(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "email"],
      });
      if (!user) {
        const error = new Error(`User with id ${userId} not found.`);
        error.statusCode = 404;
        throw error;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Inserts a new user record into the database.
   * @param {{
   *  email: string
   *  password: string
   * }} data - User creation payload.
   */
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      error.message = `Failed to create user. ${error.message}`;
      throw error;
    }
  }

  /**
   * Deletes a user record by its ID.
   * @param {number} userId - User id
   */
  async destroy(userId) {
    try {
      const deleted = await User.destroy({
        where: {
          id: userId,
        },
      });
      if (!deleted) {
        const error = new Error(`User with id ${userId} not found.`);
        error.statusCode = 404;
        throw error;
      }

      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Singleton instance of {@link UserRepository}
 *
 * Handles all data-access-level operations
 */
export const userRepositoryInstance = new UserRepository();
