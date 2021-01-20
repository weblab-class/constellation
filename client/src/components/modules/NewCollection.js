import React, { Component } from "react";

import { get } from "../../utilities";

import "./NewCollection.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * 
 * 
 */

class NewCollection extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <button className="NewCollection-navButton">new</button>  
        )
    }
}

export default NewCollection;