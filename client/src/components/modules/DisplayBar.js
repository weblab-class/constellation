import React, { Component } from "react";

import { get } from "../../utilities";

import "./DisplayBar.css";
 
class DisplayBar extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}

    render(){
        return(
            <div class="container">
                <div id="title"> Constellation </div>
            </div>
        )
    }
}

export default DisplayBar;