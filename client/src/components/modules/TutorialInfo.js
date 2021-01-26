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
    "&T.START": "Welcome to Constellation!",
    '&T.GRAPH': "Network Legend",
    '&T.ADD': "Adding Classes",
    '&T.REMOVE': "Removing Classes",
    '&T.FILE': 'About',
    '&T.SAVE': "Saving",
    '&T.LOAD': "Loading",
    '&T.RESET': "Resetting",
    '&T.NEW': "New File",
    '&T.ABOUT': 'About',
}

const tutorialBody = {
    "&T.START": "Constellation lets you do cool stuff! :D",
    '&T.GRAPH': "INSERT GRAPH DESCRIPTION",
    '&T.ADD': "INSERT ADD DESCRIPTION",
    '&T.REMOVE': "INSERT REMOVE DESCRIPTION",
    '&T.FILE': 'INSERT FILE INFORMATION HERE',
    '&T.SAVE': "INSERT SAVE DESCRIPTION",
    '&T.LOAD': "INSERT LOAD DESCRIPTION",
    '&T.RESET': "INSERT RESETTING DESCRIPTION",
    '&T.NEW': "INSERT NEW FILE DESCRIPTION",
    '&T.ABOUT': 'INSERT ABOUT INFORMATION HERE',
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