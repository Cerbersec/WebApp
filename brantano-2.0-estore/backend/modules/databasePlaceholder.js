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
    get customer_id() {
        return this.customer_id
    }
    set customer_id(value) {
        this.customer_id = value
    }

    get first_name() {
        return this.first_name
    }
    set first_name(value) {
        this.first_name = value
    }

    get last_name() {
        return this.last_name
    }
    set last_name(value) {
        this.last_name = value
    }

    get phone() {
        return this.phone
    }
    set phone(value) {
        this.phone = value
    }

    get email_address() {
        return this.email_address
    }
    set email_address(value) {
        this.email_address = value
    }

    get street() {
        return this.street
    }
    set street(value) {
        this.street = value
    }

    get postal_code() {
        return this.postal_code
    }
    set postal_code(value) {
        this.postal_code = value
    }

    get city() {
        return this.city
    }
    set city(value) {
        this.city = value
    }

    get country() {
        return this.country
    }
    set country(value) {
        this.country = value
    }

    get username() {
        return this.username
    }
    set username(value) {
        this.username = value
    }
}




c = new Customer(1)
console.log(c.city)