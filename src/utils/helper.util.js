const getAccessibility = (numAccess) => {
  if (numAccess <= 0.25) {
    return "High";
  }
  if (numAccess > 0.25 && numAccess <= 0.75) {
    return "Medium";
  }

  return "Low";
};

const getPrice = (price) => {
  if (price === 0) {
    return "Free";
  }
  if (price <= 0.5) {
    return "Low";
  }

  return "High";
};

const buildQparams = (bounds) => {
  const ret = `?minprice=${bounds.priceLower}&maxprice=${bounds.priceUpper}&minaccessibility=${bounds.accessibilityLower}&maxaccessibility=${bounds.accessibilityUpper}`;
  return ret;
};

const overwriteAccessibilityAndCost = (obj) => {
  return {
    ...obj,
    accessibility: getAccessibility(obj.accessibility),
    price: getPrice(obj.price),
  };
};

module.exports = {
  overwriteAccessibilityAndCost,
  buildQparams,
};
