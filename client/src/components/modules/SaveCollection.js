import React, { Component } from "react";

import { get } from "../../utilities";

import "./SaveCollection.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} handleSaveCollection saves current collection, prompts user to name if not saved before
 * @param {Boolean} isDisplayCollections true if collections should be displayed 
 */

class SaveCollection extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <button className="SaveCollection-navButton" disabled={this.props.isDisplayCollections} onClick={this.props.handleSaveCollection}>Save Constellation</button>  
        )
    }
}

export default SaveCollection;