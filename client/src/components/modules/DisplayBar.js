import React, { Component } from "react";

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
        return (
            <>
                <div className="DisplayBar-containerOuter">
                    <div className="DisplayBar-containerInner">
                        <div className="DisplayBar-courseTitle u-bold">
                            <p>6.006</p>
                            <p>Introduction to Algorithms</p>
                        </div>
                        <div className="DisplayBar-courseTerm">
                            <p>Term: Spring 2021 </p>
                        </div>
                        <div className="DisplayBar-prerequisites">
                            <p><bold>Prerequisites</bold>: 6.042, 6.0001</p>
                        </div>
                        <div className="DisplayBar-information">
                            <p>Course Information: Introduction to mathematical modeling of computational problems,
                            as well as common algorithms, algorithmic paradigms, and data structures
                            used to solve these problems. Emphasizes the relationship between algorithms
                            and programming, and introduces basic performance measures and analysis
                            techniques for these problems. Enrollment may be limited.
                            Course Information: Introduction to mathematical modeling of computational problems,
                            as well as common algorithms, algorithmic paradigms, and data structures
                            used to solve these problems. Emphasizes the relationship between algorithms
                            and programming, and introduces basic performance measures and analysis
                            techniques for these problems. Enrollment may be limited.
                            Course Information: Introduction to mathematical modeling of computational problems,
                            as well as common algorithms, algorithmic paradigms, and data structures
                            used to solve these problems. Emphasizes the relationship between algorithms
                            and programming, and introduces basic performance measures and analysis
                            techniques for these problems. Enrollment may be limited.
                            Course Information: Introduction to mathematical modeling of computational problems,
                            as well as common algorithms, algorithmic paradigms, and data structures
                            used to solve these problems. Emphasizes the relationship between algorithms
                            and programming, and introduces basic performance measures and analysis
                         techniques for these problems. Enrollment may be limited.</p>
                        </div>
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