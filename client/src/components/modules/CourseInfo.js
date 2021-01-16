import React, { Component } from "react";

import { get } from "../../utilities";

import "./CourseInfo.css";

/**
 * displays information for a course which is searched/selected. Contains automatic scroll feature
 *
 * Proptypes
 * @param {CourseObject} courseObject takes in the object containing information for the course searched/selected and renders as HTML
 *
 */

class DisplayBar extends Component {
    constructor(props) {
        super(props);
    }

    //componentDidMount(){}

    render() {
        return (
            <>
                <div className="CourseInfo-title u-bold">
                    <p>{this.props.courseObject.subject_id}</p>
                    <p>{this.props.courseObject.title}</p>
                </div>
                <div className="CourseInfo-term">
                    <p>Term: Spring 2021 </p>
                </div>
                <div className="CourseInfo-prerequisites">
                    <p>Prerequisites: {this.props.courseObject.prerequisites ? this.props.courseObject.prerequisites.toString() : "None"}</p>
                </div>
                <div className="CourseInfo-description">
                    <p>Description: {this.props.courseObject.description || "None"}</p>
                </div>
            </>
        )
    }
}

export default DisplayBar;