import React, { Component } from "react";
import CourseInfo from "./CourseInfo.js";
import { get } from "../../utilities";

import "./DisplayBar.css";

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
        let toDisplay;
        if(!this.props.courseObject || this.props.canvasToBeReset) {
            toDisplay=<p>no class selected...</p>;
        }
        else if(!this.props.courseObject.found) {
            toDisplay=<p className="DisplayBar-notFound">Subject with ID '{this.props.courseObject.searchedText}' not found...</p>;
        }
        else {
            toDisplay=<CourseInfo courseObject={this.props.courseObject}/>;
        }
        return (
            <>
                <div className="DisplayBar-containerOuter">
                    <div className="DisplayBar-containerInner">
                        {toDisplay}
                    </div>
                </div>
                <div className="DisplayBar-buttonContainer">
                    <button className="DisplayBar-button">Add</button>
                    <button className="DisplayBar-button">Remove</button>
                </div>
            </>
        )
    }
}

export default DisplayBar;