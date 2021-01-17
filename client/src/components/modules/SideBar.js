import React, { Component } from "react";

import { get } from "../../utilities";
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
        this.state = {
            courseObject: undefined,
        }
    }

    //componentDidMount(){}
    
    

    render(){
        return(
            <div>
                <div className="Sidebar-title"> constellation </div>
                <SearchBar handleSearch={this.props.handleSearch} setCourseObject={this.props.setCourseObject}/>
                <DisplayBar 
                    courseObject={this.state.courseObject} 
                    handleAddClass={this.props.handleAddClass} 
                    handleRemoveClass={this.props.handleRemoveClass}
                    handleLoadCollection={this.props.handleCollection}
                    handleCancel={this.props.handleCancel}/>
                
            </div>
        )
    }
}

export default SideBar;