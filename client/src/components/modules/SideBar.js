import React, { Component } from "react";

import { get } from "../../utilities";
import SearchBar from "./searchBar.js";

import "./SideBar.css";
 
class SideBar extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}

    render(){
        return(
            <div>
                <div id="title"> constellation </div>
                <SearchBar/>
            </div>
        )
    }
}

export default SideBar;