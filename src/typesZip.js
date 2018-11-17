const typeDefs = ` 
 type Query { 
   customer:Customer
   customers:[Customer]
   order:Order
   orders:[Order]
   store:Store
   stores:[Store]
   spatial_ref_sy:Spatial_ref_sy
   spatial_ref_sys:[Spatial_ref_sy]
     }
 type Mutation { 
   deleteCustomer(id:ID): Customer
   createCustomer(lastname: String firstname: String phone: String ): Customer
   updateCustomer(lastname: String firstname: String phone: String ): Customer
   deleteOrder(id:ID): Order
   createOrder(amount: String ): Order
   updateOrder(amount: String ): Order
   deleteStore(id:ID): Store
   createStore(region: String ): Store
   updateStore(region: String ): Store
   deleteSpatial_ref_sy(id:ID): Spatial_ref_sy
   createSpatial_ref_sy(auth_name: String srtext: String proj4text: String ): Spatial_ref_sy
   updateSpatial_ref_sy(auth_name: String srtext: String proj4text: String ): Spatial_ref_sy
     }
 type Customer { 
   customerid:Integer
   lastname:String
   firstname:String
   phone:String
   orders:[Order]
     }
 type Order { 
   orderid:Integer
   amount:String
   customerid:Integer
   stores:[Store]
     }
 type Store { 
   storeid:Integer
   region:String
   orderid:Integer
     }
 type Spatial_ref_sy { 
   srid:Integer
   auth_name:String
   auth_srid:Integer
   srtext:String
   proj4text:String
     } 
 }
 `;