
  const typeDefs = `
    type Query { 
        customers:[Customers]
        customersByID(id:ID):Customers
        orders:[Orders]
        ordersByID(id:ID):Orders
        stores:[Stores]
        storesByID(id:ID):Stores
    }

    type Mutation { 
        createCustomers(customerid:ID, lastname: String , firstname: String , phone: String ): Customers
        deleteCustomers(customerid:ID, lastname: String , firstname: String , phone: String ): Customers
        updateCustomers(customerid:ID, lastname: String , firstname: String , phone: String ): Customers
        createOrders(orderid:ID, amount: String , customerid: Int ): Orders
        deleteOrders(orderid:ID, amount: String , customerid: Int ): Orders
        updateOrders(orderid:ID, amount: String , customerid: Int ): Orders
        createStores(storeid:ID, region: String , orderid: Int ): Stores
        deleteStores(storeid:ID, region: String , orderid: Int ): Stores
        updateStores(storeid:ID, region: String , orderid: Int ): Stores
    }

      type Customers {  
      customerid:Int
      lastname:String
      firstname:String
      phone:String
    }

    type Orders {  
      orderid:Int
      amount:String
      customerid:Int
      orders: Customers
    }

    type Stores {  
      storeid:Int
      region:String
      orderid:Int
      stores: Orders
    }

    `
  

  module.exports = typeDefs;
  