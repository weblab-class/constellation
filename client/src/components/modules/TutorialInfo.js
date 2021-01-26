import React, { Component } from "react";

import "./TutorialInfo.css";
import tutorialExample from '../images/Tutorial-example.png';
import addImg from '../images/Tutorial-adding.png';
import removeBefore from '../images/Tutorial-removeBefore.png';
import removeAfter from '../images/Tutorial-removeAfter.png';
import { GiBarrelLeak } from "react-icons/gi";

/**
 * displays information for a course which is searched/selected. Contains automatic scroll feature
 *
 * Proptypes
 * @param {CourseObject} courseObject takes in the object containing information for the course searched/selected and renders as HTML
 *
 */

const TUTORIAL_HEADERS = {
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

class TutorialInfo extends Component {
    constructor(props) {
        super(props);
    }

    //componentDidMount(){}

    render() {
        const tutorialId = this.props.tutorialName;
        const tutorialHeader = TUTORIAL_HEADERS[tutorialId];
        console.log("tutorial id is:" + tutorialId);
        let toDisplay;
        switch(tutorialId){
            case '&T.START': {
                console.log("blah blah");
                toDisplay = (
                    <p> Constellation allows you to explore the MIT course catalog in a manner reflecting what it truly is - a really big directed graph! 
                        This short tutorial will guide you through the basics of using Constellation. To start, click the <b>Add</b> button below! </p>
                );
                break;
            };
            case '&T.GRAPH': {
                break;
            }
            case '&T.ADD': {
                toDisplay = (
                    <div>
                        <p>
                            Let's try adding a class! Before we do, note that to return to this tutorial after adding a class, simply reclick the 'Adding' node. In the search bar, try typing in the name of a class, and either hitting enter, or clicking the telescope icon. In our example, we'll use '6.009', Fundamentals of Programming.
                        After clicking the <b>Add</b> button, the following should appear on your canvas.
                        </p>
                        <img src={addImg} className = "TutorialInfo-img"/>
                        <p>
                            You'll notice that there are several important visual features at play - we'll address each of them. 
                            <ol>
                                <li><b>Color: </b> Nodes are colored in accordance to which course their classes belong to. In the picture, '6.009', belongign to course six, is colored red.</li>
                                <li><b>Opacity: </b>'6.009' is opaque while the nodes emanating from it are translucent. This is because '6.009' has been added while the remaining translucent nodes are merely suggestions.</li>
                                <li><b>Edge labels:</b> These arrows convey prerequisite information, while less commonly appearing diamonds convey corequisite information.</li>
                            </ol>
                            This information is summarized in the <b>How to View </b> node. 
                        </p>
                        <p>
                        Suggested nodes make it easier to add classes related to those you have already added. To add a selected node, simply click its node, which will cause it to appear in the display bar. Then, press add!
                        </p>
                    </div>
                )
                break;
            }
            case '&T.REMOVE': {
                toDisplay = (
                    <div>
                        <p>
                            Let's say you have the below cluster of classes and wish to remove '9.66'.
                        </p>
                        <img src={removeBefore} className = "TutorialInfo-img"/>
                        <p> To remove '9.66', we may simply select the '9.66' node, which will cause '9.66' to come up in the display bar, and then press the <b>Remove</b> button. After removing, our cluster becomes. </p>
                        <img src={removeAfter} className = "TutorialInfo-img"/>
                        <p> Note that '9.66' has not disappeared completely, but has rather become translucent. This is because it is now merely a suggested class from each of '9.40' and '6.008'. Additionally, each of '6.036', '18.05', and '6.041' has disappeared completely, as they were suggested solely by '9.66', which is no longer an added class.
                            We conclude this section with a reminder that you cannot remove suggested nodes.</p>
                    </div>
                )
                break;
            }
            case '&T.FILE': {
                toDisplay = (
                    <div>
                        <p> Constellation supports saving and loading class networks for later viewing. To explore saving, loading, and more, press the <b>Add</b> button below. </p>
                    </div>
                )
                break;
            }
            case '&T.SAVE': {
                toDisplay = (
                    <div>
                        <p> To save your file, press the <b>Save</b> button in the navigation bar. If you're current network has already been saved previously, the current contents will be updated and saved. Otherwise, you will be prompted to enter a name. </p>
                    </div>
                )
                break;
            }
            case '&T.LOAD': {
                toDisplay = (
                    <div>
                        <p> To load past networks, press the <b>Load</b> button in the navigation bar. A list of your previously saved networks will appear in the navigation bar. By selecting a file, and pressing the <b>Load</b> button, that files contents will population your canvas. Be sure to save your current file's contents before loading! </p>
                    </div>
                )
                break;
            }
            case '&T.RESET': {
                toDisplay = (
                    <div>
                        <p> To reset your canvas, press the <b>Reset</b> button in the navigation bar. This will clear all nodes from the canvas. </p>
                    </div>
                )
                break;
            }
            case '&T.NEW': {
                toDisplay = (
                    <div>
                        <p> To start a new network, press the <b>New</b> button in the navigation bar. New deos not automatically save the current network content, so be sure to save your current network before doing so if you do not wish to have them deleted. </p>
                    </div>
                )
                break;
            }
            case '&T.ABOUT': {
                toDisplay = (
                    <div>
                        <p> Constellation was created by Nicole Wong, Ben Wu, and Ezra Erives in January 2021 as part of the <b>web.lab</b> web-programming and development competition. This website is made possible by information provided by the FireRoad API, the <b>vis.js</b> network library, and, of course, the wonderful teaching staff at <b>web.lab 2021</b>! </p>
                    </div>
                )
                break;
            }
        };
        
        return (
            <>
                <div className = "u-bold u-textCenter TutorialInfo-header"> {tutorialHeader} </div>
                <div>
                    {toDisplay}
                </div>
            </>
        )
    }
}

export default TutorialInfo;