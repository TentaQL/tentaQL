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
   student:[Student]
     } 
 }
 `;