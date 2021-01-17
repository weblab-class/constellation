import React, { Component } from "react";
import { get } from "../../utilities";

import "./UserCollections.css";
import "./CanvasOptions.css"
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {paramtype} handleUserCollections function from Explorer to switch sidebar state
 *
 */

class UserCollections extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    
    render(){
        return(
            <button className="CanvasOptions-navButton" onClick={this.props.handleUserCollections}>
                My Constellations
            </button>
        )
    }

}

export default UserCollections;