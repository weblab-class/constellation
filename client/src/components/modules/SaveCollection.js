import React, { Component } from "react";

import { get } from "../../utilities";

import "./SaveCollection.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {() => ()} resetCanvas clears graph, display bar
 * 
 */

class SaveCollection extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <button className="SaveCollection-navButton" disabled={this.props.isDisplayCollections}>Save Constellation</button>  
        )
    }
}

export default SaveCollection;