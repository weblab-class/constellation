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
    
    setCourseObject = (input) => {
        get("/api/sidebarNode", {class_id: input}).then((courseArray) => {
            console.log(courseArray);
            if(courseArray.length === 0) {
                this.setState({
                    courseObject: {
                        found: false,
                        searchedText: input
                    }
                })
            }
            else {
                const courseObjectFromAPI = courseArray[0];
                this.setState({
                    courseObject: {
                        found: true,
                        searchedText: input,
                        prerequisites: courseObjectFromAPI.prerequisites,
                        subject_id: courseObjectFromAPI.subject_id,
                        title: courseObjectFromAPI.title,
                        description: courseObjectFromAPI.description
                    }
                });
            }
        });
    }

    render(){
        return(
            <div>
                <div className="Sidebar-title"> constellation </div>
                <SearchBar handleSearch={this.props.handleSearch} setCourseObject={this.setCourseObject}/>
                <DisplayBar courseObject={this.state.courseObject}/>
                
            </div>
        )
    }
}

export default SideBar;