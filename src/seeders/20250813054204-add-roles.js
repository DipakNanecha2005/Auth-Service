/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  await queryInterface.bulkInsert("Roles", [
    {
      name: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CUSTOMER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "AIRLINE_BUSINESS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
