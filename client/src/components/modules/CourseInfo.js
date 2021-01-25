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
        let term = [];
        const YEAR = 2020;
        if(this.props.courseObject.offeredFall) {
            term.push("Fall " + YEAR);
        }
        if(this.props.courseObject.offeredSpring) {
            term.push("Spring " + (YEAR+1));

        }
        if(this.props.courseObject.offeredIAP) {
            term.push("IAP " + (YEAR+1));

        }
        if(this.props.courseObject.offeredSummer) {
            term.push("Summer " + (YEAR+1));
        }

        return (
            <>
                <div className="CourseInfo-title u-bold">
                    <p>{this.props.courseObject.subjectId}</p>
                    <p>{this.props.courseObject.title}</p>
                </div>
                <div className="CourseInfo-term">
                    <p><u>Terms offered</u>: <span className="CourseInfo-info">{term.length !== 0 ? term.join(', ') : `Not offered in the ${YEAR}-${YEAR+1} school year`}</span> </p>
                </div>
                <div className="CourseInfo-prerequisites">
                    <p><u>Prereqs</u>: <span className="CourseInfo-info">{this.props.courseObject.prerequisites ? this.props.courseObject.prerequisites.toString() : "None"}</span></p>
                </div>
                <div className="CourseInfo-description">
                    <p><u>Description</u>: <span className="CourseInfo-info">{this.props.courseObject.description || "None"}</span></p>
                </div>
            </>
        )
    }
}

export default DisplayBar;