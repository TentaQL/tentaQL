
const psql = require('../psqlAdapter').psql;

const resolvers = {
  Query:{
            
    customers(){
      const query = `SELECT * FROM customers`;
      return psql.manyOrNone(query);
    },
    
    customersByID(parent, args, ctx, info){
      const query = `SELECT * FROM customers WHERE customerid = ${args.customerid}`;
      return psql.manyOrNone(query)
      .then(data=>{
        let newData = {customersByID:data[0]};
        return newData.customersByID})
        .catch(err=>{
          console.log(error)
        
      });
    }, 
    
    orders(){
      const query = `SELECT * FROM orders`;
      return psql.manyOrNone(query);
    },
    
    ordersByID(parent, args, ctx, info){
      const query = `SELECT * FROM orders WHERE orderid = ${args.orderid}`;
      return psql.manyOrNone(query)
      .then(data=>{
        let newData = {ordersByID:data[0]};
        return newData.ordersByID})
        .catch(err=>{
          console.log(error)
        
      });
    }, 
    
    stores(){
      const query = `SELECT * FROM stores`;
      return psql.manyOrNone(query);
    },
    
    storesByID(parent, args, ctx, info){
      const query = `SELECT * FROM stores WHERE storeid = ${args.storeid}`;
      return psql.manyOrNone(query)
      .then(data=>{
        let newData = {storesByID:data[0]};
        return newData.storesByID})
        .catch(err=>{
          console.log(error)
        
      });
    }, 
    
      },

  Mutation:{
            createCustomers(parent, args, ctx, info){
            let argsObj = Object.entries(args);
            let literal = '';
            let insertStr = `INSERT INTO Customers(`;
            let valuesStr = `VALUES(`
          for (let i = 0; i < argsObj.length; i++) {

              if (i > 0) {
                insertStr += ', ';
                valuesStr += ', ';
              }
              insertStr += `${argsObj[i][0]}`;
              valuesStr += `'${argsObj[i][1]}'`;
       }
       literal = insertStr + ') ' + valuesStr + ') RETURNING *';
     const query = literal;
     console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {createCustomers: data[0]};
         return newData.createCustomers})
       .catch(error => {
         console.log(error)
       });
     },

        deleteCustomers(parent, args, ctx, info){
          const query = `DELETE FROM customers WHERE customerid = ${args.customerid} RETURNING *`;
            return psql.manyOrNone(query)
            .then(data => {
              let newData = { deleteCustomers: data[0]};
              return newData.deleteCustomers;
          })
        },

      updateCustomers(parent, args, ctx, info) {
     let argsObj = Object.entries(args);
     let literal = `UPDATE Customers `;
     let counter = 0;
     for (let i = 0; i < argsObj.length; i++) {
       if (argsObj[i][0] !== 'id') {
         if(counter > 0) {
           literal += `, ${argsObj[i][0]}='${argsObj[i][1]}'`;
         } else {
           literal += `SET ${argsObj[i][0]}='${argsObj[i][1]}'`;
         }
         counter++;
       }
     }
       literal += `
       WHERE customerid = ${args.customerid} RETURNING *`;
       const query = literal;
       console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {updateCustomers: data[0]};
         return newData.updateCustomers})
       .catch(error => {
         console.log(error)
       });
   },createOrders(parent, args, ctx, info){
            let argsObj = Object.entries(args);
            let literal = '';
            let insertStr = `INSERT INTO Orders(`;
            let valuesStr = `VALUES(`
          for (let i = 0; i < argsObj.length; i++) {

              if (i > 0) {
                insertStr += ', ';
                valuesStr += ', ';
              }
              insertStr += `${argsObj[i][0]}`;
              valuesStr += `'${argsObj[i][1]}'`;
       }
       literal = insertStr + ') ' + valuesStr + ') RETURNING *';
     const query = literal;
     console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {createOrders: data[0]};
         return newData.createOrders})
       .catch(error => {
         console.log(error)
       });
     },

        deleteOrders(parent, args, ctx, info){
          const query = `DELETE FROM orders WHERE orderid = ${args.orderid} RETURNING *`;
            return psql.manyOrNone(query)
            .then(data => {
              let newData = { deleteOrders: data[0]};
              return newData.deleteOrders;
          })
        },

      updateOrders(parent, args, ctx, info) {
     let argsObj = Object.entries(args);
     let literal = `UPDATE Orders `;
     let counter = 0;
     for (let i = 0; i < argsObj.length; i++) {
       if (argsObj[i][0] !== 'id') {
         if(counter > 0) {
           literal += `, ${argsObj[i][0]}='${argsObj[i][1]}'`;
         } else {
           literal += `SET ${argsObj[i][0]}='${argsObj[i][1]}'`;
         }
         counter++;
       }
     }
       literal += `
       WHERE orderid = ${args.orderid} RETURNING *`;
       const query = literal;
       console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {updateOrders: data[0]};
         return newData.updateOrders})
       .catch(error => {
         console.log(error)
       });
   },createStores(parent, args, ctx, info){
            let argsObj = Object.entries(args);
            let literal = '';
            let insertStr = `INSERT INTO Stores(`;
            let valuesStr = `VALUES(`
          for (let i = 0; i < argsObj.length; i++) {

              if (i > 0) {
                insertStr += ', ';
                valuesStr += ', ';
              }
              insertStr += `${argsObj[i][0]}`;
              valuesStr += `'${argsObj[i][1]}'`;
       }
       literal = insertStr + ') ' + valuesStr + ') RETURNING *';
     const query = literal;
     console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {createStores: data[0]};
         return newData.createStores})
       .catch(error => {
         console.log(error)
       });
     },

        deleteStores(parent, args, ctx, info){
          const query = `DELETE FROM stores WHERE storeid = ${args.storeid} RETURNING *`;
            return psql.manyOrNone(query)
            .then(data => {
              let newData = { deleteStores: data[0]};
              return newData.deleteStores;
          })
        },

      updateStores(parent, args, ctx, info) {
     let argsObj = Object.entries(args);
     let literal = `UPDATE Stores `;
     let counter = 0;
     for (let i = 0; i < argsObj.length; i++) {
       if (argsObj[i][0] !== 'id') {
         if(counter > 0) {
           literal += `, ${argsObj[i][0]}='${argsObj[i][1]}'`;
         } else {
           literal += `SET ${argsObj[i][0]}='${argsObj[i][1]}'`;
         }
         counter++;
       }
     }
       literal += `
       WHERE storeid = ${args.storeid} RETURNING *`;
       const query = literal;
       console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {updateStores: data[0]};
         return newData.updateStores})
       .catch(error => {
         console.log(error)
       });
   },
      }
  };
  
  module.exports = resolvers;
  