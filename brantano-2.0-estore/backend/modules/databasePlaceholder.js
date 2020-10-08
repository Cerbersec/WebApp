// helper models

class Customer {
    constructor(customer_id, first_name, last_name, phone, email_address, street, postal_code, city, country, username, password) {
        this.customer_id = customer_id
        this.first_name = first_name
        this.last_name = last_name
        this.phone = phone
        this.email_address = email_address
        this.street = street
        this.postal_code = postal_code
        this.city = city
        this.country = country
        this.username = username
        this.password = password
    }
    // get customer_id() {
    //     return this.customer_id
    // }
    // set customer_id(value) {
    //     this.customer_id = value
    // }

    // get first_name() {
    //     return this.first_name
    // }
    // set first_name(value) {
    //     this.first_name = value
    // }

    // get last_name() {
    //     return this.last_name
    // }
    // set last_name(value) {
    //     this.last_name = value
    // }

    // get phone() {
    //     return this.phone
    // }
    // set phone(value) {
    //     this.phone = value
    // }

    // get email_address() {
    //     return this.email_address
    // }
    // set email_address(value) {
    //     this.email_address = value
    // }

    // get street() {
    //     return this.street
    // }
    // set street(value) {
    //     this.street = value
    // }

    // get postal_code() {
    //     return this.postal_code
    // }
    // set postal_code(value) {
    //     this.postal_code = value
    // }

    // get city() {
    //     return this.city
    // }
    // set city(value) {
    //     this.city = value
    // }

    // get country() {
    //     return this.country
    // }
    // set country(value) {
    //     this.country = value
    // }

    // get username() {
    //     return this.username
    // }
    // set username(value) {
    //     this.username = value
    // }
}

class Product {
    constructor(product_id, name, price, size, color, score, material, description, retail_price, image, stock_quantity, stock_status) {
        this.product_id = product_id
        this.name = name
        this.price = price
        this.size = size
        this.color = color
        this.score = score
        this.material = material
        this.description = description
        this.retail_price = retail_price
        this.image = image
        this.stock_quantity = stock_quantity
        this.stock_status = stock_status
    }
    // get product_id() {
    //     return this.product_id
    // }
    // set product_id(value) {
    //     this.product_id = value
    // }

    // get name() {
    //     return this.name
    // }
    // set name(value) {
    //     this.name = value
    // }
}

class Order {
    constructor(order_id, customer_id, total_price, shipping_cost, order_date) {
        this.order_id = order_id
        this.customer_id = customer_id
        this.total_price = total_price
        this.shipping_cost = shipping_cost
        this.order_date = order_date
    }
}

class Review {
    constructor(review_id, customer_id, product_id, rating, description, review_date) {
        this.review_id = review_id
        this.customer_id = customer_id
        this.product_id = product_id
        this.rating = rating
        this.description = description
        this.review_date = review_date
    }
}

class Product_Category {
    constructor(product_category_id, category_name, gender, category_age) {
        this.product_category_id = product_category_id
        this.category_name = category_name
        this.gender = gender
        this.category_age = category_age
    }
}

class Orderline {
    constructor(orderline_id, order_id, product_id, quantity, subtotal_price, discount) {
        this.orderline_id = orderline_id
        this.order_id = order_id
        this.product_id = product_id
        this.quantity = quantity
        this.subtotal_price = subtotal_price
        this.discount = discount
    }
}


c = new Customer(1)
p = new Product(1)
o = new Order(1)
r = new Review(1)
pc = new Product_Category(1)
ol = new Orderline(1)

console.log(c.city)