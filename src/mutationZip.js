const Mutation = { 
 createPlayer(parent, args, {id}, info) {
  client.query("create FROM players WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updatePlayer(parent, args, {id}, info) {
  client.query("update FROM players WHERE SOMETHING = player_id", (err,result)=>{
    if(err) throw new Error("Error updating");
    return result;
  })
  },
  deleteDog(parent, args, {id}, info) {
  client.query("DELETE FROM dogs WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createDog(parent, args, {id}, info) {
  client.query("create FROM dogs WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateDog(parent, args, {id}, info) {
  client.query("update FROM dogs WHERE SOMETHING = dog_id", (err,result)=>{
    if(err) throw new Error("Error updating");
    return result;
  })
  },
  deleteStudent(parent, args, {id}, info) {
  client.query("DELETE FROM students WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createStudent(parent, args, {id}, info) {
  client.query("create FROM students WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateStudent(parent, args, {id}, info) {
  client.query("update FROM students WHERE SOMETHING = student_id", (err,result)=>{
    if(err) throw new Error("Error updating");
    return result;
  })
  },
  deleteCat(parent, args, {id}, info) {
  client.query("DELETE FROM cats WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createCat(parent, args, {id}, info) {
  client.query("create FROM cats WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateCat(parent, args, {id}, info) {
  client.query("update FROM cats WHERE SOMETHING = cat_id", (err,result)=>{
    if(err) throw new Error("Error updating");
    return result;
  })
  },
  deleteTest(parent, args, {id}, info) {
  client.query("DELETE FROM tests WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error deleting");
    return result;
  })
  },
  createTest(parent, args, {id}, info) {
  client.query("create FROM tests WHERE SOMETHING = id", (err,result)=>{
    if(err) throw new Error("Error creating");
    return result;
  })
  },
  updateTest(parent, args, {id}, info) {
  client.query("update FROM tests WHERE SOMETHING = undefined", (err,result)=>{
    if(err) throw new Error("Error updating");
    return result;
  })
  },
   
};

module.exports = Mutation;