import React, { Component } from "react";
import { get } from "../../utilities";

import "./UserCollections.css";
import "./CanvasOptions.css"
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} handleUserCollections function from Explorer to switch sidebar state
 *
 */

class UserCollections extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    handleButtonClick = () => {
        this.props.handleUserCollections();
    }

    render(){
        return(
            <button type="submit" className="UserCollections-navButton" onClick={this.handleButtonClick} disabled={this.props.isDisplayCollections}>
                load
            </button>
        )
    }

}

export default UserCollections;