const typeDefs = ` 
 type Query { 
   player:Player
   players:[Player]
   dog:Dog
   dogs:[Dog]
   student:Student
   students:[Student]
   cat:Cat
   cats:[Cat]
   test:Test
   tests:[Test]
     }
 type Mutation { 
   deletePlayer(id:ID):Player
   createPlayer(    firstname: String 
    lastname: String 
    birthdate: String 
    country: String 
   ):Player
   updatePlayer(    firstname: String 
    lastname: String 
    birthdate: String 
    country: String 
   ):Player
   deleteDog(id:ID):Dog
   createDog(    firstname: String 
    lastname: String 
    birthdate: String 
   ):Dog
   updateDog(    firstname: String 
    lastname: String 
    birthdate: String 
   ):Dog
   deleteStudent(id:ID):Student
   createStudent(    player_name: String 
   ):Student
   updateStudent(    player_name: String 
   ):Student
   deleteCat(id:ID):Cat
   createCat(    firstname: String 
    lastname: String 
    birthdate: String 
   ):Cat
   updateCat(    firstname: String 
    lastname: String 
    birthdate: String 
   ):Cat
   deleteTest(id:ID):Test
   createTest(    subject_name: String 
   ):Test
   updateTest(    subject_name: String 
   ):Test
     }
 type Player { 
   player_id:Integer
   firstname:String
   lastname:String
   birthdate:String
   country:String
     }
 type Dog { 
   dog_id:Integer
   firstname:String
   lastname:String
   birthdate:String
     }
 type Student { 
   student_id:Integer
   player_name:String
   tests:[Test]
     }
 type Cat { 
   cat_id:Integer
   firstname:String
   lastname:String
   birthdate:String
     }
 type Test { 
   subject_id:Integer
   subject_name:String
   higheststudent_id:Integer
     } 
 }
 `;