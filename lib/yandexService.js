export const yaInit = () => {
  window.dataLayer = window.dataLayer || [];
};

export const yaSendOrderData = (data) => {
  // const yBasket = [];
  // data.basket.forEach((basketItem, index) => {
  //   let finalProductPrice = basketItem.price;
  //
  //   if (basketItem.children.length > 0) {
  //     basketItem.children.forEach((child, index) => {
  //       finalProductPrice += child.price;
  //     });
  //   }
  //
  //   yBasket.push({
  //     'name': basketItem.title,
  //     'price': finalProductPrice,
  //     'quantity': basketItem.count,
  //   });
  // });
  //
  // window.dataLayer.push({
  //   'ecommerce': {
  //     'purchase': {
  //       'actionField': {
  //         'id': Math.floor(Date.now() / 1000),
  //         'goal_id': 54977137,
  //       },
  //       'products': yBasket,
  //     },
  //   },
  // });
};
