const Mutation = { 
 createCompany(parent, args, {id}, info) {
    client.query("create FROM company WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateCompany(parent, args, {id}, info) {
          client.query("update FROM company WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteDepartment(parent, args, {id}, info) {
    client.query("DELETE FROM department WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createDepartment(parent, args, {id}, info) {
    client.query("create FROM department WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateDepartment(parent, args, {id}, info) {
          client.query("update FROM department WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteNewcompany(parent, args, {id}, info) {
    client.query("DELETE FROM newcompany WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createNewcompany(parent, args, {id}, info) {
    client.query("create FROM newcompany WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateNewcompany(parent, args, {id}, info) {
          client.query("update FROM newcompany WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteJpcompany(parent, args, {id}, info) {
    client.query("DELETE FROM jpcompany WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createJpcompany(parent, args, {id}, info) {
    client.query("create FROM jpcompany WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateJpcompany(parent, args, {id}, info) {
          client.query("update FROM jpcompany WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteBill(parent, args, {id}, info) {
    client.query("DELETE FROM bill WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createBill(parent, args, {id}, info) {
    client.query("create FROM bill WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateBill(parent, args, {id}, info) {
          client.query("update FROM bill WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteStock_availability(parent, args, {id}, info) {
    client.query("DELETE FROM stock_availability WHERE product_id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createStock_availability(parent, args, {id}, info) {
    client.query("create FROM stock_availability WHERE product_id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateStock_availability(parent, args, {id}, info) {
          client.query("update FROM stock_availability WHERE product_id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            deleteProduct(parent, args, {id}, info) {
    client.query("DELETE FROM product WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    createProduct(parent, args, {id}, info) {
    client.query("create FROM product WHERE id = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    updateProduct(parent, args, {id}, info) {
          client.query("update FROM product WHERE id = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
             
};
  module.exports = Mutation;