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

    handleNodeClick = () => {

    }

    render(){
        return(
            <div className="Canvas-container" ref={this.divRef}>
                    <VisNetwork
                        newClass = {this.props.newClass}
                        getNeighbors = {this.props.getNeighbors}
                        handleNodeClick = {this.props.handleNodeClick}
                        setCourseObject = {this.props.setCourseObject}
                        getLoadCollectionInfo = {this.props.getLoadCollectionInfo}
                        canvasToBeReset = {this.props.canvasToBeReset}
                        saveCanvasCounter= {this.props.saveCanvasCounter}
                        loadCollectionCounter={this.props.loadCollectionCounter}
                        exportNetwork={this.props.exportNetwork}
                        newClass = {this.props.newClass}
                        removeClass = {this.props.removeClass}
                        importNetwork= {this.props.importNetwork}
                    />
            </div>
        )
    }
}

export default Canvas;

