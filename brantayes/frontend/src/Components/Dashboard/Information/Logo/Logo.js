import "./Logo.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import { Button } from "@material-ui/core";
// validation
import Form from "react-validation/build/form";

class Logo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            imageURL: "",
            invalidImage: false,
            message: null,
        }

        this.handleUpload = this.handleUpload.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setLogo = this.setLogo.bind(this)
        this.reader = new FileReader()
    }

    componentDidMount() {
        this.setLogo()
    }

    handleChange(e) {
        const imgFile = e.target.files[0]
        if(imgFile && imgFile.type === "image/png") {
            this.setState({message: null})        
            this.reader.onload = (e) => {
                const img = new Image()
                img.onload = () => {
                    this.setState({invalidImage: false, image: imgFile})
                }

                img.onerror = () => {
                    this.setState({invalidImage: true, message: "Invalid image"})
                    return false
                }

                img.src = e.target.result
            }

            this.reader.readAsDataURL(imgFile)
        }
        else {
            this.setState({invalidImage: true, message: "Invalid image. Must be PNG"})
            return false
        }
    }

    async handleUpload(e) {
        e.preventDefault()
        const { image } = this.state

        if(!image) {
            this.setState({invalidImage: true, message: "No image selected"})
            return false
        }
        else {
            const data = new FormData()
            data.append('file', image)

            const response = await Api.uploadLogo(data).then((r) => {
                this.setState({message: r.message})
            }).catch((err) => {
                this.setState({message: err.message})
            })
        }
    }

    setLogo() {
        let img = new Image()
        img.onload = () => {
            this.setState({imageURL: "banner.png"})
        }
    
        img.onerror = () => {
            this.setState({imageURL: "brantayes.png"})
        }
    
        fetch('/banner.png', {method: 'HEAD'}).then((r) => {
            img.src = r.url
        })
    }

    render() {
        return(
            <div id="changelogo">
                <h2>Change logo</h2>
                <Form className="logoform" >
                    <img className="logo-preview" src={this.state.imageURL} alt="banner" />
                    <fieldset>
                        <div className="row logo-msg">
                            {this.state.message && (
                                this.state.invalidImage ? (
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                ) : (
                                    <div className="alert alert-success" role="alert">
                                        {this.state.message}
                                    </div>
                                )                           
                            )}
                        </div>
                        <div className="row">
                            <input id="fileupload" accept="image/png" style={{display: 'none'}} type="file" onChange={this.handleChange} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="fileupload">
                                    <Button className="form-btn" variant="outlined" color="primary" component="span">
                                        Select new logo
                                    </Button>
                                </label>
                            </div>
                            <div className="col-md-6">
                                <Button className="form-btn" variant="outlined" color="primary" component="span" onClick={this.handleUpload}>
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                </Form>
            </div>
        )
    }
}

export default Logo