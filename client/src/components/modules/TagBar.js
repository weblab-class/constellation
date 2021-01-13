import React, { Component } from "react";

import { get } from "../../utilities";

import "./TagBar.css";
 
class TagBar extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}

    render(){
        return(
            <div class="container">
                <div id="title"> Constellation </div>
                <SearchBar/>
                <TagBar/>
                <DisplayBar/>
            </div>
        )
    }
}

export default TagBar;