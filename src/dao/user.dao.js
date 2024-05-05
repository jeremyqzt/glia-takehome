const db = require("./baseDb");
const constants = require("../utils/constats");
const { v4: uuidv4 } = require("uuid");

const create = async (name, accessibility, price) => {
  const requestedId = uuidv4();
  await db.query(
    `INSERT INTO users(userId, userName, accessibilityId, priceId) 
    VALUES 
    ('${requestedId}', '${name}', ${constants.accessibilityToDbIdMap[accessibility]}, ${constants.priceToDbIdMap[price]});`
  );

  return {
    id: requestedId,
    name,
    accessibility,
    price,
  };
};
const getBounds = async (id) => {
  const res = await db.queryData(
    `SELECT p.upperBound as priceUpper, p.lowerBound as priceLower,
    a.upperBound as accessibilityUpper, a.lowerBound as accessibilityLower
    FROM users u JOIN prices p on u.priceId = p.Id
    JOIN accessibility a on u.accessibilityId = a.Id WHERE u.userId = '${id}';`
  );

  return {
    res,
  };
};

module.exports = { create, getBounds };
