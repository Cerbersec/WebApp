import "./CompanyInfo.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import { isNumeric, isEmail } from "validator";

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
}

const vmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid e-mail address.
        </div>
      );
    }
}

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            successful: false,
            disabled: false,
            message: "",
            email: "",
            phone: "",
            address1: "",
            address2: "",
            address3: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async getCompanyInfo() {
        this.setState({loading: true})
        const shipping = await Api.getCompanyInfo();
        if(shipping) {this.setState({shipping_costs: shipping})}
        this.setState({loading: false})
    }

    async handleSubmit(e){
        e.preventDefault()

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            const data = {
                email: this.state.email,
                phone: this.state.phone,
                address1: this.state.address1,
                address2: this.state.address2,
                address3: this.state.address3
            }
            
            const response = await Api.updateCompanyInfo(data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
        }
        else {
            this.setState({successful: false})
        }
    }

    componentDidMount() {
        this.getCompanyInfo();
    }

    render() {
        return(
            <div>
                <h2>Edit the company information</h2>
                <Form classname="companyInfoForm" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                {!this.state.successful && (
                    <fieldset disabled={this.state.disabled}>
                        <div className="row">
                            <label>E-mail: </label>
                            <Input
                                className="form-control"
                                id="email"
                                type="text"
                                value={this.companyinfo.email}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required, vmail]}
                            />
                        </div>
                        <div className="row">
                            <label>Phone number: </label>
                            <Input
                                className="form-control"
                                id="phone"
                                type="text"
                                value={this.companyinfo.phone}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required, vnumber]}
                            />
                        </div>
                        <div className="row">
                            <label>Street name and number: </label>
                            <Input
                                className="form-control"
                                id="steetandnumber"
                                type="text"
                                value={this.companyinfo.phone}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required]}
                            />
                        </div>
                        <div className="row">
                            <label>City and postal code: </label>
                            <Input
                                className="form-control"
                                id="cityandpostal"
                                type="text"
                                value={this.companyinfo.phone}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required]}
                            />
                        </div>
                        <div className="row">
                            <label>Country: </label>
                            <Input
                                className="form-control"
                                id="country"
                                type="text"
                                value={this.companyinfo.phone}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required]}
                            />
                        </div>
                        <div className="row">
                            <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            type="submit"
                            >
                                SAVE
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

export default CompanyInfo