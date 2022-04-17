import _sequelize from 'sequelize';

const { Model, Sequelize } = _sequelize;

export default class Streets extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      iikoId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: 'streets_iikoId_uindex',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
      classifierId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      externalRevision: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'streets',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'streets_iikoId_uindex',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'iikoId' },
          ],
        },
        {
          name: 'streets_cities_id_fk',
          using: 'BTREE',
          fields: [
            { name: 'cityId' },
          ],
        },
      ],
    });
    return Streets;
  }
}
