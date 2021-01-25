import React, { Component } from "react";

import "./TutorialInfo.css";

/**
 * displays information for a course which is searched/selected. Contains automatic scroll feature
 *
 * Proptypes
 * @param {CourseObject} courseObject takes in the object containing information for the course searched/selected and renders as HTML
 *
 */

const tutorialName = {
    "@T.START": "Welcome to Constellation!",
    '@T.GRAPH': "Graph Information",
    '@T.ADD': "Adding Classes",
    '@T.REMOVE': "Removing Classes",
    '@T.SAVELOAD': "Saving and Loading",
    '@T.RESET': "Resetting",
    '@T.NEW': "New File",
}

const tutorialBody = {
    "@T.START": "Constellation lets you do cool stuff! :D",
}

class TutorialInfo extends Component {
    constructor(props) {
        super(props);
    }

    //componentDidMount(){}

    render() {
       
        const tutorialHeader = tutorialName[this.props.tutorialName];
        const tutorialBodyText = tutorialBody[this.props.tutorialName];

        return (
            <>
                <div>
                    <p> {tutorialHeader} </p>
                    <p> {tutorialBodyText} </p>
                </div>

            </>
        )
    }
}

export default TutorialInfo;