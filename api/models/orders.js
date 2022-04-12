import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Orders extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'addresses',
        key: 'id'
      }
    },
    zoneId: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    paymentType: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    personsCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isSelfService: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iikoId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coupon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    spendBonus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('NEW','WAIT_PAYMENT','PAYED','COMPLETED'),
      allowNull: true
    },
    isIikoSend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    isTelegramSend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "orders_users_id_fk",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "orders_user_addresses_id_fk",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
  return Orders;
  }
}
