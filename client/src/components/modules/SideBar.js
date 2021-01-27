import React, { Component } from "react";

import SearchBar from "./SearchBar.js";
import DisplayBar from "./DisplayBar.js";

import "./SideBar.css";

/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 * @param {Function} setCourseObject passed to search bar
 * @param {Boolean} isDisplayCollections passed to search and display bar
 * @param {Object} courseObject passed to display bar
 * @param {Function} handleAddClass passed to display bar
 * @param {Function} handleRemoveClass passed to display bar
 * @param {Function} handleLoadCollection passed to display bar
 * @param {Function} handleCancel passed to display bar
 * @param {Boolean} canvasToBeReset passed to display bar
 * @param {Array} collectionsArray passed to display bar
 * @param {Function} setToNoCollections passed to display bar
 * @param {Function} setToLoaded passed to display bar
 * @param {Boolean} loaded passed to display bar
 */

class SideBar extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        return(
            <>
                <div className="Sidebar-title"> constellation </div>
                <SearchBar 
                    setCourseObject={this.props.setCourseObject}
                    isDisplayCollections={this.props.isDisplayCollections}
                    optionsAreDisplayed={this.props.optionsAreDisplayed}
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
                    optionsAreDisplayed={this.props.optionsAreDisplayed}
                    toggleFilterValue = {this.props.toggleFilterValue}
                    filterObject = {this.props.filterObject}

                />
            </>
        )
    }
}

export default SideBar;