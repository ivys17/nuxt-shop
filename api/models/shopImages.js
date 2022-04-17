import _sequelize from 'sequelize';

const { Model, Sequelize } = _sequelize;

export default class ShopImages extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      imageId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      uploadDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      revision: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'shopImages',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'imageId' },
          ],
        },
        {
          name: 'product_images_id_uindex',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'imageId' },
          ],
        },
        {
          name: 'shopImages_products_id_fk',
          using: 'BTREE',
          fields: [
            { name: 'ownerId' },
          ],
        },
      ],
    });
    return ShopImages;
  }
}
