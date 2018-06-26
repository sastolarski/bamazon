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
                connection.end();
            }
        });
}
//second function shows inventory and prompts user for item and quantity
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

                }, {
                    name: "itemQuantity",
                    type: "input",
                    message: "Please enter the quanitiy you would like to purchase."
                }

            ]).then(function (answer) {
                var buy = parseFloat(answer.itemSelect) - 1;
                var num = parseFloat(answer.itemQuantity);
                if(num > res[buy].stock_quanitity){
                    console.log("============================================");
                    console.log("Sorry we dont have that much in stock right now.  Please try again.");
                    console.log("============================================");
                    start();
                } else {
                //parse float to turn the answers into integers and then console log the results out in the CLI
                console.log("============================================");
                console.log("Your Total for " + num + " " + res[buy].product_name + "(s) is $" + (num * res[buy].price) + " and your order will be shipped within 2 days.");
                console.log("Thank you for your business.");
                console.log("============================================");
                start();
                }
            });

    });

};





