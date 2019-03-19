
--Create the Database if it does not exist--
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

-- To create some initial products --
-- Using , to separate the different products instead of copying INSERT INTO per product --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones", "TV", 45.38, 50), 
("Pogo Stick", "Toys", 8.98, 10), 
("Shadows over Camelot", "Board Games", 40.50, 25), 
("Street Fighter V", "Video Games", 60.38, 80), 
("The Princess Bride", "Movies", 19.99, 38), 
("The Animator's Survival Kit", "Books", 20.99, 48),
("Clue", "Board Games", 19.99, 60), 
("Horizon Zero Dawn", "Video Games", 40.98, 75),
("Cow Plant", "Decor", 38.00, 5), 
("The Vision of Escaflowne", "TV", 29.99, 50);
