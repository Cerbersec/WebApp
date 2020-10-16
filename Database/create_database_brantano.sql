CREATE DATABASE brantano;

USE brantano;

CREATE TABLE Customers (
	customer_id INT NOT NULL IDENTITY(1,1),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	gender CHAR(1) NOT NULL DEFAULT 'X',
	phone VARCHAR(13),
	email_address VARCHAR(100) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password CHAR(64) NOT NULL,
	CONSTRAINT PK_Customer PRIMARY KEY(customer_id)
);

CREATE TABLE Addresses (
	address_id INT NOT NULL IDENTITY(1,1),
	street_name VARCHAR(200) NOT NULL,
	postal_code VARCHAR(10) NOT NULL,
	street_nr INT NOT NULL,
	bus_nr INT,
	city VARCHAR(100) NOT NULL,
	country VARCHAR(50) NOT NULL,
	customer_id INT NOT NULL,
	CONSTRAINT PK_Address PRIMARY KEY(address_id),
	CONSTRAINT FK_CustomerAddress FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Categories (
	category_id INT NOT NULL IDENTITY(1,1),
	category_name VARCHAR(50) NOT NULL,
	gender CHAR(1),
	category_age VARCHAR(8),
	CONSTRAINT PK_Category PRIMARY KEY(category_id)
);

CREATE TABLE Products (
	product_id INT NOT NULL IDENTITY(1,1),
	name VARCHAR(100) NOT NULL,
	brand VARCHAR(50) NOT NULL,
	size FLOAT NOT NULL,
	color VARCHAR(20) NOT NULL,
	release_date DATE NOT NULL,
	retail_price INT NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	category_id INT NOT NULL,
	CONSTRAINT PK_Product PRIMARY KEY(product_id),
	CONSTRAINT FK_ProductCategory FOREIGN KEY(category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Reviews (
	review_id INT NOT NULL IDENTITY(1,1),
	rating INT NOT NULL,
	description VARCHAR(400),
	review_date DATE NOT NULL,
	customer_id INT NOT NULL,
	product_id INT NOT NULL,
	CONSTRAINT PK_Review PRIMARY KEY(review_id),
	CONSTRAINT FK_CustomerReview FOREIGN KEY(customer_id) REFERENCES Customers(customer_id),
	CONSTRAINT FK_ProductReview FOREIGN KEY(product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
	order_id INT NOT NULL IDENTITY(1,1),
	total_price INT NOT NULL,
	shipping_cost INT NOT NULL,
	order_date DATE NOT NULL,
	customer_id INT NOT NULL,
	CONSTRAINT PK_Order PRIMARY KEY(order_id),
	CONSTRAINT FK_CustomerOrder FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Orderlines (
	orderline_id INT NOT NULL IDENTITY(1,1),
	quantity INT NOT NULL,
	subtotal_price INT NOT NULL,
	discount INT NOT NULL DEFAULT 0,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	CONSTRAINT PK_Orderline PRIMARY KEY(orderline_id),
	CONSTRAINT FK_OrderOrderline FOREIGN KEY(order_id) REFERENCES Orders(order_id),
	CONSTRAINT FK_ProductOrderline FOREIGN KEY(product_id) REFERENCES Products(product_id)
);