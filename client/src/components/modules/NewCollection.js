import React, { Component } from "react";

import { get } from "../../utilities";

import "./NewCollection.css";
 
/**
 * create new collection
 *
 * Proptypes
 * 
 * 
 */

class NewCollection extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className="NewCollection-navButton" disabled={this.props.isDisplayCollections} onClick={this.props.handleNewCollection}>new</button>  
        )
    }
}

export default NewCollection;