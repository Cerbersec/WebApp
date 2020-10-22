CREATE TABLE Address
(
	address_id int NOT NULL,
	customer_id int NOT NULL,
	street_name varchar(200) NOT NULL,
	street_nr int NOT NULL,
	bus_nr int,
	postal_code varchar(10) NOT NULL,
	city varchar(100) NOT NULL,
	country varchar(50) NOT NULL
)

CREATE TABLE Category
(
	category_id int NOT NULL,
	category_name varchar(50) NOT NULL,
	gender varchar(1),
	category_age varchar(8)
)

CREATE TABLE Review
(
	review_id int NOT NULL,
	customer_id int NOT NULL,
	product_id int NOT NULL,
	rating int NOT NULL,
	description varchar(400),
	review_date date NOT NULL
)

CREATE TABLE OrderID
(
	order_id int NOT NULL,
	customer_id int NOT NULL,
	total_price int NOT NULL,
	shipping_cost int NOT NULL,
	order_date date NOT NULL
)

CREATE TABLE Orderline
(
	orderline_id int NOT NULL,
	order_id int NOT NULL,
	product_id int NOT NULL,
	quantity int NOT NULL,
	subtotal_price int NOT NULL,
	discount int NOT NULL
)
