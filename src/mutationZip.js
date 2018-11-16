const Mutation = { 
 createPlayer(parent, args, {id}, info) {
  client.query("create FROM  players WHERE player_id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updatePlayer(parent, args, {id}, info) {
        client.query("update FROM  players WHERE player_id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteDog(parent, args, {id}, info) {
  client.query("DELETE FROM  dogs WHERE dog_id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createDog(parent, args, {id}, info) {
  client.query("create FROM  dogs WHERE dog_id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateDog(parent, args, {id}, info) {
        client.query("update FROM  dogs WHERE dog_id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteStudent(parent, args, {id}, info) {
  client.query("DELETE FROM  students WHERE student_id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createStudent(parent, args, {id}, info) {
  client.query("create FROM  students WHERE student_id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateStudent(parent, args, {id}, info) {
        client.query("update FROM  students WHERE student_id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
          deleteCat(parent, args, {id}, info) {
  client.query("DELETE FROM  cats WHERE cat_id = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createCat(parent, args, {id}, info) {
  client.query("create FROM  cats WHERE cat_id = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateCat(parent, args, {id}, info) {
        client.query("update FROM  cats WHERE cat_id = id", (err,result)=>{
            if(err) throw new Error("Error creating");
            return result;
          })
          },
           
};
module.exports = Mutation;