	INSERT INTO dbo.Address (address_id, customer_id, street_name, street_nr, postal_code, city, country)
	VALUES ('12', '5399133913176', 'Lindenlei', '36', '2557', 'Kessel-Lo', 'Belgium')

	INSERT INTO dbo.Category
	VALUES('3429', 'Kids', 'M', '10')

	INSERT INTO dbo.Review (review_id, customer_id, product_id, rating, review_date)
	VALUES('721', '5399133913176', '71643281', '4', '15/10/2020')

	INSERT INTO dbo.OrderID
	VALUES ('1673', '5399133913176', '150', '4', '12/10/2020')

	INSERT INTO dbo.Orderline
	VALUES ('1673', '5399133913176', '2', '150', '0')