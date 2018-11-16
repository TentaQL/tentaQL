const Query = { 
      player(parent, {id}, ctx, info) {
        client.query("SELECT*FROM players where player_id= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all player")
          return result;
        });
      },
      
      players(parent, args, ctx, info) {
          client.query("SELECT*FROM players", (err,result)=>{
            if(err) throw new Error("Error querying all players")
            return result;
          })
      
      },
      
      dog(parent, {id}, ctx, info) {
        client.query("SELECT*FROM dogs where dog_id= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all dog")
          return result;
        });
      },
      
      dogs(parent, args, ctx, info) {
          client.query("SELECT*FROM dogs", (err,result)=>{
            if(err) throw new Error("Error querying all dogs")
            return result;
          })
      
      },
      
      student(parent, {id}, ctx, info) {
        client.query("SELECT*FROM students where student_id= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all student")
          return result;
        });
      },
      
      students(parent, args, ctx, info) {
          client.query("SELECT*FROM students", (err,result)=>{
            if(err) throw new Error("Error querying all students")
            return result;
          })
      
      },
      
      cat(parent, {id}, ctx, info) {
        client.query("SELECT*FROM cats where cat_id= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all cat")
          return result;
        });
      },
      
      cats(parent, args, ctx, info) {
          client.query("SELECT*FROM cats", (err,result)=>{
            if(err) throw new Error("Error querying all cats")
            return result;
          })
      
      },
      
      test(parent, {id}, ctx, info) {
        client.query("SELECT*FROM tests where undefined= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all test")
          return result;
        });
      },
      
      tests(parent, args, ctx, info) {
          client.query("SELECT*FROM tests", (err,result)=>{
            if(err) throw new Error("Error querying all tests")
            return result;
          })
      
      },
       
 };