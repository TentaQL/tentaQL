const Mutation = { 
 createCompany(parent, args, {id}, info) {
  client.query("create FROM  companies WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateCompany(parent, args, {id}, info) {
        client.query("update FROM  companies WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteDepartment(parent, args, {id}, info) {
  client.query("DELETE FROM  departments WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createDepartment(parent, args, {id}, info) {
  client.query("create FROM  departments WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateDepartment(parent, args, {id}, info) {
        client.query("update FROM  departments WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteNewcompany(parent, args, {id}, info) {
  client.query("DELETE FROM  newcompanies WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createNewcompany(parent, args, {id}, info) {
  client.query("create FROM  newcompanies WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateNewcompany(parent, args, {id}, info) {
        client.query("update FROM  newcompanies WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteJpcompany(parent, args, {id}, info) {
  client.query("DELETE FROM  jpcompanies WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createJpcompany(parent, args, {id}, info) {
  client.query("create FROM  jpcompanies WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateJpcompany(parent, args, {id}, info) {
        client.query("update FROM  jpcompanies WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteBill(parent, args, {id}, info) {
  client.query("DELETE FROM  bills WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createBill(parent, args, {id}, info) {
  client.query("create FROM  bills WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateBill(parent, args, {id}, info) {
        client.query("update FROM  bills WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteStock_availability(parent, args, {id}, info) {
  client.query("DELETE FROM  stock_availabilities WHERE product_id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createStock_availability(parent, args, {id}, info) {
  client.query("create FROM  stock_availabilities WHERE product_id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateStock_availability(parent, args, {id}, info) {
        client.query("update FROM  stock_availabilities WHERE product_id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteProduct(parent, args, {id}, info) {
  client.query("DELETE FROM  products WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createProduct(parent, args, {id}, info) {
  client.query("create FROM  products WHERE id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateProduct(parent, args, {id}, info) {
        client.query("update FROM  products WHERE id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
           
};
module.exports = Mutation;