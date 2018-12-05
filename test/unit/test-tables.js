const tables = {
  customers: {
    customerid: "integer",
    lastname: "character varying",
    firstname: "character varying",
    phone: "character varying"
  },
  orders: {
    orderid: "integer",
    amount: "character varying",
    customerid: "integer"
  },
  stores: {
    storeid: "integer",
    region: "character varying",
    orderid: "integer"
  },
  primaryKeys: {
    customers: "customerid",
    orders: "orderid",
    stores: "storeid"
  },
  foreignTables: { orders: "customers", stores: "orders" }
};
module.exports = tables;
