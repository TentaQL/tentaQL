const Mutation = { 
 createCustomer(parent, args, {id}, info) {
  client.query("create FROM  customers WHERE customerid = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateCustomer(parent, args, {id}, info) {
        client.query("update FROM  customers WHERE customerid = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteOrder(parent, args, {id}, info) {
  client.query("DELETE FROM  orders WHERE orderid = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createOrder(parent, args, {id}, info) {
  client.query("create FROM  orders WHERE orderid = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateOrder(parent, args, {id}, info) {
        client.query("update FROM  orders WHERE orderid = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteStore(parent, args, {id}, info) {
  client.query("DELETE FROM  stores WHERE storeid = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createStore(parent, args, {id}, info) {
  client.query("create FROM  stores WHERE storeid = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateStore(parent, args, {id}, info) {
        client.query("update FROM  stores WHERE storeid = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
           
};
module.exports = Mutation;