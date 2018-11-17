const Query = { 
      customer(parent, {id}, ctx, info) {
        client.query("SELECT*FROM customers where customerid= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all customer")
          return result;
        });
      },
      
      customers(parent, args, ctx, info) {
          client.query("SELECT*FROM customers", (err,result)=>{
            if(err) throw new Error("Error querying all customers")
            return result;
          })
      
      },
      
      order(parent, {id}, ctx, info) {
        client.query("SELECT*FROM orders where orderid= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all order")
          return result;
        });
      },
      
      orders(parent, args, ctx, info) {
          client.query("SELECT*FROM orders", (err,result)=>{
            if(err) throw new Error("Error querying all orders")
            return result;
          })
      
      },
      
      store(parent, {id}, ctx, info) {
        client.query("SELECT*FROM stores where storeid= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all store")
          return result;
        });
      },
      
      stores(parent, args, ctx, info) {
          client.query("SELECT*FROM stores", (err,result)=>{
            if(err) throw new Error("Error querying all stores")
            return result;
          })
      
      },
      
      spatial_ref_sy(parent, {id}, ctx, info) {
        client.query("SELECT*FROM spatial_ref_sies where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all spatial_ref_sy")
          return result;
        });
      },
      
      spatial_ref_sys(parent, args, ctx, info) {
          client.query("SELECT*FROM spatial_ref_sys", (err,result)=>{
            if(err) throw new Error("Error querying all spatial_ref_sys")
            return result;
          })
      
      },
       
 };