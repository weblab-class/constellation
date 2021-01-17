import React, { Component } from "react";
import UserCollections from "./UserCollections.js";
import SaveCollection from "./SaveCollection.js";

import { navigate } from "@reach/router";
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
    
    returnHome () {
        navigate("/");
    }
    
    render(){
        return(
            
            <nav className="CanvasOptions-navBar">
                <button onClick={this.props.resetCanvas}>Reset Canvas</button>  
                <SaveCollection handleSaveCollection={this.props.handleSaveCollection}/>
                <UserCollections handleUserCollections={this.props.handleUserCollections}/>
                <button onClick={this.returnHome}> Back to Home </button>
            </nav>
        )
    }
}

export default CanvasOptions;