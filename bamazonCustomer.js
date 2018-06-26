var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

//On connect to database run first function
//==================================================================================

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();

});

//start function uses inquirier to ask user if they would like to see the inventory
//==================================================================================

function start() {
    inquirer
        .prompt({
            name: "purchase",
            type: "rawlist",
            message: "Would you like to purchase an item from our inventory? [YES] or [NO]",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.purchase.toUpperCase() === "YES") {
                showInventory();
            }
            else {
                console.log("Maybe next time.")
            }
        });
}
//second function shows inventory if user confirms the first function
//==================================================================================

function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quanitity + " in stock");
        }

        inquirer
        .prompt([
            {
            name: "itemSelect",
            type: "input",
            message: "Please input the item ID number of the item you would like to purchase"

            },{
            name: "itemQuantity",
            type: "input",
            message: "Please enter the quanitiy you would like to purchase."
            }

    
        ]).then(function (answer) {
            var buy = parseFloat(answer.itemSelect) - 1;
            var num = answer.itemQuantity;
            console.log(buy);
            console.log(num);
            
            console.log("Your Order of " + num + " " + res[buy].product_name + "(s) is on the way!");

                    

        })

    })
    
}





