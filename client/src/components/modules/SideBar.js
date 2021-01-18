import React, { Component } from "react";

import SearchBar from "./SearchBar.js";
import DisplayBar from "./DisplayBar.js";

import "./SideBar.css";

/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 *
 */

class SideBar extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        return(
            <div>
                <div className="Sidebar-title"> constellation </div>
                <SearchBar 
                    handleSearch={this.props.handleSearch} 
                    setCourseObject={this.props.setCourseObject}
                    isDisplayCollections={this.props.isDisplayCollections}
                />
                <DisplayBar 
                    courseObject={this.props.courseObject} 
                    handleAddClass={this.props.handleAddClass} 
                    handleRemoveClass={this.props.handleRemoveClass}
                    handleLoadCollection={this.props.handleLoadCollection}
                    handleCancel={this.props.handleCancel}
                    canvasToBeReset={this.props.canvasToBeReset}
                    isDisplayCollections={this.props.isDisplayCollections}
                    collectionsArray={this.props.collectionsArray}
                    setToNoCollections={this.props.setToNoCollections}
                    setToLoaded={this.props.setToLoaded}
                    loaded={this.props.loaded}
                />
            </div>
        )
    }
}

export default SideBar;