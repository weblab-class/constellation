import React, { Component } from "react";

import { get } from "../../utilities";

import "./Dropdown.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} handleSaveCollection saves current collection, prompts user to name if not saved before
 * @param {Boolean} isDisplayCollections true if collections should be displayed 
 */

class Dropdown extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <button> dropdown </button>
        )
    }
}

export default Dropdown;