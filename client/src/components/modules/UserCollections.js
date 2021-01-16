import React, { Component } from "react";
import { get } from "../../utilities";

import "./CanvasOptions.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 *
 */

class UserCollections extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    

    render(){
        return(
            <button>
                My Constellations
            </button>
        )
    }
}

export default UserCollections;