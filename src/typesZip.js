const typeDefs = ` 
 type Query { 
   customer:Customer
   customers:[Customer]
   order:Order
   orders:[Order]
   store:Store
   stores:[Store]
     }
 type Mutation { 
   deleteCustomer(id:ID): Customer
   createCustomer(lastname:String, firstname:String, phone:String): Customer
   updateCustomer(lastname:String, firstname:String, phone:String): Customer
   deleteOrder(id:ID): Order
   createOrder(amount:String): Order
   updateOrder(amount:String): Order
   deleteStore(id:ID): Store
   createStore(region:String): Store
   updateStore(region:String): Store
     }
 type Customer { 
   customerid:Int
   lastname:String
   firstname:String
   phone:String
   orders:[Order]
     }
 type Order { 
   orderid:Int
   amount:String
   customerid:Int
   stores:[Store]
     }
 type Store { 
   storeid:Int
   region:String
   orderid:Int
     } 
 }
 `;