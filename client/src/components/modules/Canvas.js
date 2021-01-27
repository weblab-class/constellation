import React, { Component } from "react";
import VisNetwork from "../network/VisNetwork.js";

import "./Canvas.css";

/**
 * Canvas for the graph
 *
 * Proptypes
 * @param {function} exportNetwork passed to visNetwork to to export current network data
 * @param {string} newClass new class to be added to network
 * @param {number} newClassCounter allows visNetwork to know whether or not current class is new 
 * @param {function} getNeighbors gets neighbors to a node (prereqs/coreqs/afterreqs to a class)
 * @param {string} removeClass name of class to be removed, passed to visNetwork
 * @param {number} removeClassCounter increment triggers removal of removeClass in visNetwork 
 * @param {string} filterToToggle id of filter to toggle
 * @param {number} filterCounter increment triggers filter to toggle
 * @param {number} canvasToBeReset increment triggers canvas reset
 * @param {number} saveCanvasCounter increment triggers canvas to save data to database
 * @param {number} loadCollectionCounter increment triggers canvas to load new collection
 * @param {function} setCourseObject  passed to visNetwork so that node click sets course object
 * @param {function} importNetwork called when loadCollectionCounter increments, loads  network
 */

class Canvas extends Component {
    constructor(props){
        super(props);
        this.divRef=React.createRef();
        this.state={
            width: null,
            height: null,
        }
    }


    render(){
        return(
            <div className="Canvas-container" ref={this.divRef}>
                    <VisNetwork
                        getNeighbors = {this.props.getNeighbors}
                        handleNodeClick = {this.props.handleNodeClick}
                        setCourseObject = {this.props.setCourseObject}
                        canvasToBeReset = {this.props.canvasToBeReset}
                        saveCanvasCounter= {this.props.saveCanvasCounter}
                        loadCollectionCounter={this.props.loadCollectionCounter}
                        exportNetwork={this.props.exportNetwork}
                        newClass = {this.props.newClass}
                        newClassCounter = {this.props.newClassCounter}
                        filterToToggle = {this.props.filterToToggle}
                        filterCounter = {this.props.filterCounter}
                        removeClass = {this.props.removeClass}
                        removeClassCounter = {this.props.removeClassCounter}
                        importNetwork= {this.props.importNetwork}
                    />
            </div>
        )
    }
}

export default Canvas;

