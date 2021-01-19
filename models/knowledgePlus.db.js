const Sequelize = require('sequelize');

/**
 * @swagger
 *   components:
 *       schemas:
 *        knowledgePlus:
 *         type: object
 *         properties:
 *           faqno:
 *             type: integer
 *             description : 지식 + 인덱스 입니다.
 *           category1:
 *             type: string
 *             description: 지식 + 카테고리 1입니다.
 *           category2:
 *             type: string
 *             description: 지식 + 카테고리 2입니다.
 *           category3:
 *             type: string
 *             description: 지식 + 카테고리 3입니다.
 *           category4:
 *             type: string
 *             description: 지식 + 카테고리 4 입니다.
 *           category5:
 *             type: string
 *             description: 지식 + 카테고리 5 입니다.
 *           question:
 *             type: text
 *             description: 지식 + 질문 입니다.
 *           questionAnswer:
 *             type: text
 *             description: 지식 + 질문에 대한 답변입니다.
 *           landingUrl :
 *             type: text
 *             description: 지식 + 링크를 다는 것입니다.
 *           imageinfo :
 *             type: text
 *             description: 지식 + 이미지 썸네일 링크를 다는 것입니다.
 *           createdAt:
 *             type: datetime
 *             description: 등록한 시간이 들어갑니다.
 *           updatedAt:
 *             type: datetime
 *             description: 수정한 시간이 들어갑니다.
 */
module.exports = class KnowledgePlus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        faqno: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        category1: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        category2: {
          type: Sequelize.STRING(100),
        },
        category3: {
          type: Sequelize.STRING(100),
        },
        category4: {
          type: Sequelize.STRING(100),
        },
        category5: {
          type: Sequelize.STRING(100),
        },
        question: {
          type: Sequelize.TEXT,
        },
        questionAnswer: {
          type: Sequelize.TEXT,
        },
        landingUrl: {
          type: Sequelize.TEXT,
        },
        imageinfo: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'KnowledgePlus',
        tableName: 'knowledgePlus',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.KnowledgePlus.belongsTo(db.User, { foreignKey: 'modifier', targetKey: 'idx' });
  }
};
