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
        this.state = {
            newClass: null,
        }
    }

    handleSearch = (inputText) => {
        this.setState({
            newClass: inputText,
        });
    }

    // componentDidMount() {}

    render(){
        return(
            <div className="Explorer-all">
                <div className="Explorer-container"> 
                    <div className="Explorer-canvas"> 
                        <Canvas newClass={this.state.newClass}/>
                    </div>
                    <div className="Explorer-sideBar"> 
                        <SideBar handleSearch={this.handleSearch}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explorer;