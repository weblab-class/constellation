import React, { Component } from "react";
import VisNetwork from "../network/VisNetwork.js";

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
            width: null,
            height: null,
        }
    }

    updateWindowProps = () => {
        this.setState({
            width: this.divRef.current.clientWidth,
            height: this.divRef.current.clientHeight,
        });
    }

    componentDidMount = () => {
        this.setState({
            width: this.divRef.current.clientWidth,
            height: this.divRef.current.clientHeight,
        });
        window.addEventListener('resize', this.updateWindowProps);
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
                        newClassCounter = {this.props.newClassCounter}
                        removeClass = {this.props.removeClass}
                        removeClassCounter = {this.props.removeClassCounter}
                        importNetwork= {this.props.importNetwork}
                        networkHeight = {this.state.height}
                        networkWidth = {this.state.width}
                    />
            </div>
        )
    }
}

export default Canvas;

