const Query = { 
      company(parent, {id}, ctx, info) {
        client.query("SELECT*FROM companies where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all company")
          return result;
        });
      },
      
      department(parent, args, ctx, info) {
          client.query("SELECT*FROM department", (err,result)=>{
            if(err) throw new Error("Error querying all department")
            return result;
          })
      
      },
      
      newcompany(parent, {id}, ctx, info) {
        client.query("SELECT*FROM newcompanies where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all newcompany")
          return result;
        });
      },
      
      jpcompany(parent, args, ctx, info) {
          client.query("SELECT*FROM jpcompany", (err,result)=>{
            if(err) throw new Error("Error querying all jpcompany")
            return result;
          })
      
      },
      
      test1(parent, {id}, ctx, info) {
        client.query("SELECT*FROM test1S where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all test1")
          return result;
        });
      },
      
      bill(parent, args, ctx, info) {
          client.query("SELECT*FROM bill", (err,result)=>{
            if(err) throw new Error("Error querying all bill")
            return result;
          })
      
      },
      
      stock_availability(parent, {id}, ctx, info) {
        client.query("SELECT*FROM stock_availabilities where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all stock_availability")
          return result;
        });
      },
      
      product(parent, args, ctx, info) {
          client.query("SELECT*FROM product", (err,result)=>{
            if(err) throw new Error("Error querying all product")
            return result;
          })
      
      },
      
      bill_product(parent, {id}, ctx, info) {
        client.query("SELECT*FROM bill_products where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all bill_product")
          return result;
        });
      },
       
 };