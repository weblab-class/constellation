import React, { Component } from "react";
import UserCollections from "./UserCollections.js";
import SaveCollection from "./SaveCollection.js";
import { get } from "../../utilities";

import "./CanvasOptions.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {() => ()} resetCanvas clears graph, display bar
 * 
 */

class CanvasOptions extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <nav className="CanvasOptions-navBar">
                <button>Reset Canvas</button>  
                <SaveCollection handleSaveCollection={this.props.handleSaveCollection}/>
                <UserCollections handleUserCollections={this.props.handleUserCollections}/>
            </nav>
        )
    }
}

export default CanvasOptions;