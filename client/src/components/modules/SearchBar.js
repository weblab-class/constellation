import React, { Component } from "react";

import { get } from "../../utilities";

import "./SearchBar.css";
 
class SearchBar extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}

    render(){
        return(
            <div className="SearchBar-container">
                <input type="text" placeholder="Blah blah blah.."></input>
            </div>
        )
    }
}

export default SearchBar;