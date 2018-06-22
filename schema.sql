CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60),
    price INT,
    stock_quanitity INT,
    PRIMARY KEY (item_id)
);

