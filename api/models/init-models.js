import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Addresses from  "./addresses.js";
import _Blocks from  "./blocks.js";
import _Cities from  "./cities.js";
import _Customers from  "./customers.js";
import _Files from  "./files.js";
import _Groups from  "./groups.js";
import _Options from  "./options.js";
import _OrderIikoAnswer from  "./orderIikoAnswer.js";
import _OrderProductModifiers from  "./orderProductModifiers.js";
import _OrderProducts from  "./orderProducts.js";
import _OrderSberbank from  "./orderSberbank.js";
import _Orders from  "./orders.js";
import _Pages from  "./pages.js";
import _PaymentTypes from  "./paymentTypes.js";
import _ProductGroupModifiers from  "./productGroupModifiers.js";
import _ProductGroupModifiersChildren from  "./productGroupModifiersChildren.js";
import _ProductModifiers from  "./productModifiers.js";
import _Products from  "./products.js";
import _Reviews from  "./reviews.js";
import _Sberbank from  "./sberbank.js";
import _ShopImages from  "./shopImages.js";
import _Slides from  "./slides.js";
import _StopList from  "./stopList.js";
import _Streets from  "./streets.js";
import _TelegramUsers from  "./telegramUsers.js";

export default function initModels(sequelize) {
  const Addresses = _Addresses.init(sequelize, DataTypes);
  const Blocks = _Blocks.init(sequelize, DataTypes);
  const Cities = _Cities.init(sequelize, DataTypes);
  const Customers = _Customers.init(sequelize, DataTypes);
  const Files = _Files.init(sequelize, DataTypes);
  const Groups = _Groups.init(sequelize, DataTypes);
  const Options = _Options.init(sequelize, DataTypes);
  const OrderIikoAnswer = _OrderIikoAnswer.init(sequelize, DataTypes);
  const OrderProductModifiers = _OrderProductModifiers.init(sequelize, DataTypes);
  const OrderProducts = _OrderProducts.init(sequelize, DataTypes);
  const OrderSberbank = _OrderSberbank.init(sequelize, DataTypes);
  const Orders = _Orders.init(sequelize, DataTypes);
  const Pages = _Pages.init(sequelize, DataTypes);
  const PaymentTypes = _PaymentTypes.init(sequelize, DataTypes);
  const ProductGroupModifiers = _ProductGroupModifiers.init(sequelize, DataTypes);
  const ProductGroupModifiersChildren = _ProductGroupModifiersChildren.init(sequelize, DataTypes);
  const ProductModifiers = _ProductModifiers.init(sequelize, DataTypes);
  const Products = _Products.init(sequelize, DataTypes);
  const Reviews = _Reviews.init(sequelize, DataTypes);
  const Sberbank = _Sberbank.init(sequelize, DataTypes);
  const ShopImages = _ShopImages.init(sequelize, DataTypes);
  const Slides = _Slides.init(sequelize, DataTypes);
  const StopList = _StopList.init(sequelize, DataTypes);
  const Streets = _Streets.init(sequelize, DataTypes);
  const TelegramUsers = _TelegramUsers.init(sequelize, DataTypes);

  Orders.belongsTo(Addresses, { as: "address", foreignKey: "addressId"});
  Addresses.hasMany(Orders, { as: "orders", foreignKey: "addressId"});
  Streets.belongsTo(Cities, { as: "city", foreignKey: "cityId"});
  Cities.hasMany(Streets, { as: "streets", foreignKey: "cityId"});
  Addresses.belongsTo(Customers, { as: "user", foreignKey: "userId"});
  Customers.hasMany(Addresses, { as: "addresses", foreignKey: "userId"});
  Orders.belongsTo(Customers, { as: "user", foreignKey: "userId"});
  Customers.hasMany(Orders, { as: "orders", foreignKey: "userId"});
  OrderProductModifiers.belongsTo(OrderProducts, { as: "orderProduct", foreignKey: "orderProductId"});
  OrderProducts.hasMany(OrderProductModifiers, { as: "orderProductModifiers", foreignKey: "orderProductId"});
  OrderIikoAnswer.belongsTo(Orders, { as: "order", foreignKey: "orderId"});
  Orders.hasMany(OrderIikoAnswer, { as: "orderIikoAnswers", foreignKey: "orderId"});
  OrderProducts.belongsTo(Orders, { as: "order", foreignKey: "orderId"});
  Orders.hasMany(OrderProducts, { as: "orderProducts", foreignKey: "orderId"});
  OrderSberbank.belongsTo(Orders, { as: "order", foreignKey: "orderId"});
  Orders.hasMany(OrderSberbank, { as: "orderSberbanks", foreignKey: "orderId"});

  return {
    Addresses,
    Blocks,
    Cities,
    Customers,
    Files,
    Groups,
    Options,
    OrderIikoAnswer,
    OrderProductModifiers,
    OrderProducts,
    OrderSberbank,
    Orders,
    Pages,
    PaymentTypes,
    ProductGroupModifiers,
    ProductGroupModifiersChildren,
    ProductModifiers,
    Products,
    Reviews,
    Sberbank,
    ShopImages,
    Slides,
    StopList,
    Streets,
    TelegramUsers,
  };
}
