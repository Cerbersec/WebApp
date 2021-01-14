import "./Edit.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import { Button, Select, MenuItem } from "@material-ui/core";
// validation
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import { isNumeric } from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const vnumber = (value) => {
    if (!isNumeric(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid number.
        </div>
      );
    }
  };

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            searchmessage: "",
            successful: false,
            disabled: false,
            editing: false,
            product_id: "",
            name: "",
            brand: "",
            minsize: "",
            maxsize: "",
            color: "",
            release_date: "",
            retail_price: "",
            price: "",
            stock_quantity: "",
            description: "",
            image_url: "",
            type: "",
            category: "",
            categories: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.getProduct = this.getProduct.bind(this)
    }

    async fetchCategories() {
        const response = await Api.getCategories()
        .then((cat) => {
            this.setState({categories: cat})
        }).catch((err) => {
            console.error(err)
        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            const data = {
                name: this.state.name,
                brand: this.state.brand,
                size: (this.state.minsize + "-" + this.state.maxsize),
                color: this.state.color,
                release_date: this.state.release_date,
                retail_price: this.state.retail_price,
                price: this.state.price,
                stock_quantity: this.state.stock_quantity,
                description: this.state.description,
                image_url: this.state.image_url,
                type: this.state.type,
                category: this.state.category
            }

            this.setState({disabled: true})
            
            const response = await Api.editProduct(this.state.product_id,data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
        }
    }

    async getProduct(e) {
        e.preventDefault()
        this.searchform.validateAll();

        if(this.searchCheckBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            
            const response = await Api.getItemUsingID(this.state.product_id).then((r) => {
                this.setState({product: r, editing: true})
            }).catch((err) => {
                this.setState({successful: false, searchmessage: err.response.data.message})
            })
        }
        else {
            this.setState({successful: false})
        }
    }

    componentDidMount() {
        this.fetchCategories()
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.product !== prevState.product) {
            var splitSize = this.state.product.size.split("-")
            this.setState({
                editing: true, 
                searchmessage: this.state.product.message,
                name: this.state.product.name,
                brand: this.state.product.brand,
                minsize: splitSize[0],
                maxsize: splitSize[1],
                color: this.state.product.color,
                release_date: this.state.product.release_date,
                retail_price: this.state.product.retail_price,
                price: this.state.product.price,
                stock_quantity: this.state.product.stock_quantity,
                description: this.state.product.description,
                image_url: this.state.product.image_url,
                type: this.state.product.type,
                category: this.state.product.category_id,
            })
        }
    }

    render() {
        return(
            <div id="editproduct">
                <h2>Edit a product</h2>
                <Form classname="prodSearch" onSubmit={this.getProduct} ref={(c) => {this.searchform = c}} >
                    <fieldset disabled={this.state.disabled}>
                        <div className="row">
                            <label>Product ID: </label>
                        </div>
                        <div className="row">
                            <Input className="form-control" id="productid" type="text" value={this.state.product_id} onChange={e => {this.setState({product_id: e.target.value})}} validations={[required, vnumber]}/>
                        </div>
                        <div className="row">
                            <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            type="submit"
                            disabled={this.state.editing}
                            >
                                Search
                            </Button>
                        </div>
                    </fieldset>
                    <div className="row">
                        {this.state.searchmessage && (
                            <div className="message">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.searchmessage}
                                </div>
                            </div>
                        )}
                    </div>
                    <CheckButton style={{display:"none"}} ref={(c) => {this.searchCheckBtn = c}} />
                </Form>
                
                <Form onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                {!this.state.successful && (
                <fieldset disabled={!this.state.editing}>
                    <div className="row">
                        <div className="col-md-6">
                            <label>name: </label>
                            <Input className="form-control" type="text" value={this.state.name} onChange={e => {this.setState({name: e.target.value})}} validations={[required]}/>
                            <label>brand: </label>
                            <Input className="form-control" type="text" value={this.state.brand} onChange={e => {this.setState({brand: e.target.value})}} validations={[required]}/>
                            <label>Minimum size: </label>
                            <Input className="form-control" type="text" value={this.state.minsize} onChange={e => {this.setState({minsize: e.target.value})}} validations={[required,vnumber]}/>
                            <label>Maximum size: </label>
                            <Input className="form-control" type="text" value={this.state.maxsize} onChange={e => {this.setState({maxsize: e.target.value})}} validations={[required,vnumber]}/>
                        </div>
                        <div className="col-md-6">
                            <label>color: </label>
                            <Input className="form-control" type="text" value={this.state.color} onChange={e => {this.setState({color: e.target.value})}} validations={[required]}/>
                            <label>release date (YYYY-MM-DD): </label>
                            <Input className="form-control" type="text" value={this.state.release_date} onChange={e => {this.setState({release_date: e.target.value})}} validations={[required]}/>
                            <label>stock_quantity: </label>
                            <Input className="form-control" type="text" value={this.state.stock_quantity} onChange={e => {this.setState({stock_quantity: e.target.value})}} validations={[required]}/>
                            <label>image url: </label>
                            <Input className="form-control" type="text" value={this.state.image_url} onChange={e => {this.setState({image_url: e.target.value})}} validations={[required]}/>
                        </div>
                        <div className="col-md-6">
                            <label>price: </label>
                            <Input className="form-control" type="text" value={this.state.price} onChange={e => {this.setState({price: e.target.value})}} validations={[required]}/>
                            <label>retail price: </label>
                            <Input className="form-control" type="text" value={this.state.retail_price} onChange={e => {this.setState({retail_price: e.target.value})}} validations={[required]}/>
                            <label>type: </label>
                            <Input className="form-control" type="text" value={this.state.type} onChange={e => {this.setState({type: e.target.value})}} validations={[required]}/>
                            <label>Category: </label>
                            <div id="select">
                                <Select disableUnderline displayEmpty value={this.state.category} onChange={e=> {this.setState({category: e.target.value})}}>
                                    <MenuItem value="">Select Category</MenuItem>
                                    {this.state.categories.map(category => {
                                        return <MenuItem value={category.category_id}>{category.product_group}: {category.category_name}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>description: </label>
                            <Textarea className="form-control" type="text" multiline rows="4" value={this.state.description} onChange={ e => {this.setState({description: e.target.value})}} validations={[required]}/>
                        </div>
                    </div>

                    <div className="row">
                        <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            type="submit"
                            disabled={!this.state.editing}
                        >
                            Submit
                        </Button>
                    </div>
                </fieldset>
                    )}
                    <div className="row">
                        {this.state.message && (
                            <div className="message">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                    <CheckButton style={{display:"none"}} ref={(c) => {this.checkBtn = c}} />
                </Form>
            </div>
        )
    }
}

export default Edit