export const getModifiersFromIikoData = (products) => {
  return products.reduce((acc, p) => {
    if (!p.modifiers) {
      return acc;
    }

    const i = p.modifiers.map(modifier => {
      return {
        ...modifier,
        productId: p.id,
      };
    });
    if (!i.length) {
      return acc;
    }

    acc = acc.concat(i);
    return acc;
  }, []);
};

export const getGroupModifiersFromIikoData = (products) => products.reduce((acc, p) => {
  if (!p.groupModifiers?.length) {
    return acc;
  }

  p.groupModifiers.forEach(el => {
    el.parentId = p.id;
  });

  acc = acc.concat(p.groupModifiers);
  return acc;
}, []);

export const getGroupModifiersChildrenFromIikoData = (groupModifiers) => groupModifiers.reduce(
  (acc, current) => {
    if (!current.childModifiers?.length) {
      return acc;
    }

    current.childModifiers.forEach(el => {
      el.parentId = current.modifierId;
    });

    acc = acc.concat(current.childModifiers);
    return acc;
  }, []);

export const normalizeStopList = (stopList = []) => {
  return stopList.flatMap(org => {
    return org.items.map(item => {
      return {
        organizationId: org.organizationId,
        deliveryTerminalId: org.deliveryTerminalId,
        productId: item.productId,
        balance: item.balance,
      };
    });
  });
};

export const isCompanyEmployee = (userCategories) => {
  return userCategories.map(uc => uc.id).includes('4be14fbd-bb2c-42c5-92d0-325e3ae4d4df');

};

