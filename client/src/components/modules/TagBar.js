import React, { Component } from "react";

import { get } from "../../utilities";

import "./TagBar.css";
 
/**
 * Holds the tags used to filter classes
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 *
 */
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