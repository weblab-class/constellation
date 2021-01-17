import React, { Component } from "react";
import VisNetwork from "../network/VisNetwork.js";

import { get } from "../../utilities";

import "./Canvas.css";

/**
 * Canvas for the graph
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 *
 */

class Canvas extends Component {
    constructor(props){
        super(props);
        this.divRef=React.createRef();
        this.state={
            width: '400px',
            height: '300px',
        }
    }

    render(){
        return(
            <div className="Canvas-container" ref={this.divRef}>
                    <VisNetwork 
                        newClass = {this.props.newClass}
                        getNeighbors = {this.props.getNeighbors}/>
            </div>
        )
    }
}

export default Canvas;

