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
    welcomeToBamazon();
  
    // connection.end();
  });

function welcomeToBamazon() {

  inquirer.prompt([
    {
      type: "confirm",
      name: "intro",
      message: "Welcome to Bamazon! Would you like to browse our products?",
      default: true
    }
  ]).then(function(user) {
    if (user.intro === true) {

      showProducts();

    } else {
      console.log("Thanks for stopping by.")
      connection.end();
    }
  })
  
}

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
   customerQuery();
  });
}

//User can see and select products to buy
function customerQuery() {
  
  inquirer.prompt([{

    type: "input",
    name: "item",
    message: "Enter the ID # of the item you would like to purchase.",
},
{
    type: "input",
    name: "stock",
    message: "How many of this item would you like to buy?",
}
]).then(function(answer) {

  connection.query("SELECT * FROM products WHERE id=?", answer.item, function(err, res) {
    if (err) throw err; //such elegant error handling, said no one ever

      for (var i = 0; i < res.length; i++) {
        if (answer.stock > res[i].stock_quantity) {

          console.log("Sorry! Not enough in stock. Please try again later.");

          startPrompt();

        } else {

          var inventoryItem = answer.item;
          var userBuy = Number(answer.stock);

          connection.query('SELECT * FROM products SET ? WHERE ?', [{
            stock_quantity: userBuy - res[i].stock_quantity
        }, {
            id: inventoryItem
        }], function(err, res) {
          if (err) throw err;
          
        });
          console.log("Purchase Successful!")
          buyAnythingElse();
        }
      }
    })
  })
}


function buyAnythingElse() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "startOver",
      message: "Would you like to buy anything else?",
      default: true
    }
  ]).then(function(yn){
    if (yn.startOver === true) {
      showProducts();
    } else {
      console.log("Thank you, come again!")
    }
  })
}

