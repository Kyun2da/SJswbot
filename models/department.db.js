const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        department:
 *         type: object
 *         properties:
 *           idx:
 *             type: integer
 *             description: 학과의 인덱스 입니다.
 *           department:
 *             type: string
 *             description: 학과의 학과정보입니다.
 */
module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Department',
        tableName: 'department',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Department.hasMany(db.AssistantNotice, { foreignKey: 'department', sourceKey: 'idx' });
    db.Department.hasMany(db.User, { foreignKey: 'department', sourceKey: 'idx' });
    db.Department.hasMany(db.Question, { foreignKey: 'department', sourceKey: 'idx' });
    db.Department.hasMany(db.Notice, { foreignKey: 'department', sourceKey: 'idx' });
    db.Department.hasMany(db.Curriculum, { foreignKey: 'department', sourceKey: 'idx' });
    db.Department.hasMany(db.Status, { foreignKey: 'department', sourceKey: 'idx' });
  }
};
