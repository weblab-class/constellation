import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";

import "./Explorer.css";

import { get } from "../../utilities";


class Explorer extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {}

    render(){
        return(
            <div id="all">
                <div className="Explorer-container"> 
                    <div id="canvas"> 
                        <Canvas/>
                    </div>
                    <div id="sideBar"> 
                        <SideBar/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explorer;