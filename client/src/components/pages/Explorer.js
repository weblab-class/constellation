import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";

import "./Explorer.css";

import { get } from "../../utilities";

/**
 * Explorer page. Where all the main features are: canvas, sidebar
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */

class Explorer extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {}

    render(){
        return(
            <div className="Explorer-all">
                <div className="Explorer-container"> 
                    <div className="Explorer-canvas"> 
                        <Canvas/>
                    </div>
                    <div className="Explorer-sideBar"> 
                        <SideBar/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explorer;