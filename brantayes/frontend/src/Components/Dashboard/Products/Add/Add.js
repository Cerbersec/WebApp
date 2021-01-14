import "./Add.css";
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

class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            successful: false,
            disabled: false,
            message: "",
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
    }

    async handleSubmit(e) {
        e.preventDefault()

        this.form.validateAll()

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
            
            const response = await Api.addProduct(data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
        }
    }

    async fetchCategories() {
        const response = await Api.getCategories()
        .then((cat) => {
            this.setState({categories: cat})
        }).catch((err) => {
            console.error(err)
        })
    }

    componentDidMount() {
        this.fetchCategories()
     }

    render() {
        return(
            <div id="addproduct">
                <h2>Add a new product</h2>
                <Form onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                {!this.state.successful && (
                <fieldset disabled={this.state.disabled}>
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
                            <Input className="form-control" type="text" value={this.state.stock_quantity} onChange={e => {this.setState({stock_quantity: e.target.value})}} validations={[required,vnumber]}/>
                            <label>image url: </label>
                            <Input className="form-control" type="text" value={this.state.image_url} onChange={e => {this.setState({image_url: e.target.value})}} validations={[required]}/>
                        </div>
                        <div className="col-md-6">
                            <label>price: </label>
                            <Input className="form-control" type="text" value={this.state.price} onChange={e => {this.setState({price: e.target.value})}} validations={[required,vnumber]}/>
                            <label>retail price: </label>
                            <Input className="form-control" type="text" value={this.state.retail_price} onChange={e => {this.setState({retail_price: e.target.value})}} validations={[required,vnumber]}/>
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
                        >
                            Add
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

export default Add