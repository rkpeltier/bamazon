var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    
    //Inquirer
    customerQuery();
  
    // connection.end();
  });
  
  function customerQuery() {
    inquirer
      .prompt({
        name: "itemId",
        type: "input",
        message: "What is the ID of the item you would like to buy?",
      },
      {
        name: "stock",
        type: "input",
        message: "How much would you like to purchase?"
      })
      .then(function(answer) {
        var item = answer.itemId;
        var quantity = answer.stock;
        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, item, function(err, data){
          if (err) {throw err};

          if (data.length === 0) {
            console.log("Error: Invalid Item ID.")
          } else {
            //Else display item
            //order item
            //check stock and throw error if out of stock
            //otherwise purchase successful
          }
        })
        
          connection.end();
        
      });
  }

