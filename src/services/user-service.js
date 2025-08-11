import { userRepositoryInstance } from "../repository/user-repository.js";

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
}

/**
 * Singleton instance of {@link UserService}.
 *
 * Provides the service layer methods to handle User operations.
 */
const UserServiceinstance = new UserService();

export default UserService;
export { UserServiceinstance as UserService };
