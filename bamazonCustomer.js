var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    // customerQuery();
    showProducts();
  
    connection.end();
  });


 //Show products looping through the products available and displaying a table to user
function showProducts() {

  connection.query('SELECT * FROM products', function(err, res){
    if (err) throw err;

    var table = new Table({
      head: ['ID', 'Product Name', 'Department', 'Price', 'Qty'],
      colWidths: [10, 30, 30, 20, 10]
    });

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, 
      res[i].department_name, res[i].price, res[i].stock_quantity]);
   }
   console.log(table.toString());
  });


}

//User can see and select products to buy
function customerQuery() {

}

