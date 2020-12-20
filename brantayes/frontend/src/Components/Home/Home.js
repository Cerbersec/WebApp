import React, { Component } from "react";
import "./Home.css"
import { Button, Box } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import banner from "../../Images/banner.png"

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div id="homepage">
                <Box className="container">
                <img className="item" src={banner} alt="Brantayes banner"/>
                <Button
                    className="item"
                    variant="outlined"
                    size="large"
                    style={{fontWeight: "bolder"}}
                    onClick={() => {this.props.history.push("/store")}}
                >
                    Shop Now <ChevronRight />
                </Button>
                </Box>
            </div>
        )
    }
}

export default Home