const Sequelize = require('sequelize');

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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Department.hasOne(db.AssistantNotice, { foreignKey: 'department', sourceKey: 'idx' });
  }
};
