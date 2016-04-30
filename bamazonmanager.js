var mysql = require("mysql");
var prompt = require("prompt");
prompt.start();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BAMAZON'
});

connection.connect(function(err,res) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('connection good');

	}
console.log("The menu options are 1.) View products for sale 2.) View Low Inventory 3.) Add to Inventory 4.) Add new product ");

userOption();
});

function userOption() {

	console.log('Please Choose an option:');
	prompt.get(['option'],function (err,res){
		choice = res.option;
	switch (choice) {

		case "1":
			viewProducts();
		 	break;
		case "2":
			lowInventory();
			break;
		case "3":
			addToInventory();
			break;
		case "4":
			addItem();
			break;
	    }

	});

	

}

function viewProducts() {

	connection.query('SELECT * FROM PRODUCTS',function(err,rows,fields) {
 	
 	for (i=0; i < rows.length; i++) {
 	console.log("The name of this product is: "+rows[i].ProductName+". Item ID is: "+rows[i].ItemID+". Price: "+rows[i].Price+" Quantity: "+rows[i].StockQuantity);

 		}

 	 });
	
}

function lowInventory() {
	console.log('Items low in Stock (less than 5 )');

	connection.query('SELECT * FROM PRODUCTS WHERE StockQuantity < 5',function(err,rows,fields) {
 	
 	for (i=0; i < rows.length; i++) {
 	console.log("The name of this product is: "+rows[i].ProductName+". Item ID is: "+rows[i].ItemID+". Price: "+rows[i].Price+" Quantity: "+rows[i].StockQuantity);

 		}

 	 });

}

function addToInventory() {
	console.log("Choose an id and quantity of item you'd like to add: ")

	prompt.get(['id','Quantity'],function (err,res) {
		 id = res.id;
		 amount = res.Quantity;

		// console.log(id,amount);
	
		connection.query('UPDATE PRODUCTS SET StockQuantity = StockQuantity + '+amount+' WHERE ItemID = '+id,function(err,res) {
			if (err) {
				console.log(err);
			}
		 else {
		 	console.log('Update Good. New Quantities are provided below');
		 
		viewProducts();
			
			}

		});

	});	

}

function addItem() {

	console.log('Enter product name, price and quantity below');
	prompt.get(['name','dept','price','quantity'], function (err,res){
		name = res.name;
		price = res.price;
		quantity = res.quantity;
		dept = res.dept;

		connection.query('INSERT INTO PRODUCTS(ProductName,DepartmentName,Price,StockQuantity) VALUES (?,?,?,?)',[name,dept,price,quantity],function (err,res) {

					if (err) {
						console.log(err);
					}
					else {
						viewProducts();
					}
						
				}); 
			});

	}








                     


