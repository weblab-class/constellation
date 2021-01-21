import React, { Component } from "react";
import UserCollections from "./UserCollections.js";
import SaveCollection from "./SaveCollection.js";
import NewCollection from "./NewCollection.js";
import Dropdown from "./Dropdown.js";

import "./CanvasOptions.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} resetCanvas callback function to clear graph, display bar
 * @param {Function} handleSaveCollection passed to SaveCollection
 * @param {Function} handleUserCollections passed to UserCollection
 * @param {Boolean} isDisplayCollections passed to SaveCollection 
 * @param {Function} handleLogout passed to dropdown

 */

class CanvasOptions extends Component {
    constructor(props){
        super(props);
        
        
    }
    
    
    render(){
        return(
            <>
            <nav className="CanvasOptions-navBar">
                <Dropdown handleLogout={this.props.handleLogout}/>
                <UserCollections handleUserCollections={this.props.handleUserCollections}/>
                <NewCollection />
                <button type="submit" className="CanvasOptions-gridReset" onClick={this.props.resetCanvas} disabled={this.props.isDisplayCollections}>reset</button>  
                <SaveCollection handleSaveCollection={this.props.handleSaveCollection} isDisplayCollections={this.props.isDisplayCollections}/>
            </nav>
            </>
        );
    }
}

export default CanvasOptions;