const typeDefs = ` 
 type Query { 
   company:[Company]
   department:[Department]
   newcompany:[Newcompany]
   jpcompany:[Jpcompany]
   test1:[Test1]
   bill:[Bill]
   stock_availability:[Stock_availability]
   product:[Product]
   bill_product:[Bill_product]
     }
 type Mutation { 
   deleteCompany(id:ID): Company
   createCompany(name:String, age:Int, address:String, salary:Float): Company
   updateCompany(name:String, age:Int, address:String, salary:Float): Company
   deleteDepartment(id:ID): Department
   createDepartment(dept:String): Department
   updateDepartment(dept:String): Department
   deleteNewcompany(id:ID): Newcompany
   createNewcompany(name:String, age:Int, address:String, salary:undefined): Newcompany
   updateNewcompany(name:String, age:Int, address:String, salary:undefined): Newcompany
   deleteJpcompany(id:ID): Jpcompany
   createJpcompany(name:String, age:Int, address:String, salary:Float, join_date:String): Jpcompany
   updateJpcompany(name:String, age:Int, address:String, salary:Float, join_date:String): Jpcompany
   deleteTest1(id:ID): Test1
   createTest1(a:Boolean, b:String): Test1
   updateTest1(a:Boolean, b:String): Test1
   deleteBill(id:ID): Bill
   createBill(bill:String): Bill
   updateBill(bill:String): Bill
   deleteStock_availability(id:ID): Stock_availability
   createStock_availability(available:Boolean): Stock_availability
   updateStock_availability(available:Boolean): Stock_availability
   deleteProduct(id:ID): Product
   createProduct(product:String): Product
   updateProduct(product:String): Product
   deleteBill_product(id:ID): Bill_product
   createBill_product(some_other_column:String): Bill_product
   updateBill_product(some_other_column:String): Bill_product
     }
 type Company { 
   id:Int
   name:String
   age:Int
   address:String
   salary:Float
     }
 type Department { 
   id:Int
   dept:String
   emp_id:Int
     }
 type Newcompany { 
   id:Int
   name:String
   age:Int
   address:String
   salary:Float
     }
 type Jpcompany { 
   id:Int
   name:String
   age:Int
   address:String
   salary:Float
   join_date:String
     }
 type Test1 { 
   a:Boolean
   b:String
     }
 type Bill { 
   id:Int
   bill:String
     }
 type Stock_availability { 
   product_id:Int
   available:Boolean
     }
 type Product { 
   id:Int
   product:String
   bill_product:[Bill_product]
     }
 type Bill_product { 
   bill_id:Int
   product_id:Int
   some_other_column:String
     } 
 }
 `;