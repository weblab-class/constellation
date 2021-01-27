import React, { Component } from "react";

import "./TutorialInfo.css";
import tutorialExample from '../images/Tutorial-example.png';
import addImg from '../images/Tutorial-adding.png';
import addImgTwo from '../images/Tutorial-addingTwo.png';
import addImgThree from '../images/Tutorial-addingThree.png';
import addImgFour from '../images/Tutorial-addingFour.png';
import addImgFive from '../images/Tutorial-addingFive.png';
import addImgSix from '../images/Tutorial-addingSix.png';
import searchImgName from '../images/Tutorial_dropdownName.png';
import searchImgPhrase from '../images/Tutorial_dropdownPhrase.png';
import filterImgOne from '../images/Tutorial-filterOne.png';
import filterImgTwo from '../images/Tutorial-filterTwo.png';
import filterImgThree from '../images/Tutorial-filterThree.png';
import filterImgFour from '../images/Tutorial-filterFour.png';
import filterImgFive from '../images/Tutorial-filterFive.png';

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
    '&T.BASICS': "The Basics",
    '&T.ADD': "Adding Classes",
    '&T.REMOVE': "Removing Classes",
    '&T.SEARCH': "Using the Search Bar",
    '&T.FILE': 'File Handling',
    '&T.SAVE': "Saving",
    '&T.LOAD': "Loading",
    '&T.RESET': "Resetting",
    '&T.NEW': "New File",
    '&T.ABOUT': 'About',
    '&T.FILTER': 'Filtering',
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
                    <div>
                        <p> Constellation unlocks the wealth of MIT’s web of knowledge through visualizing what it truly is — a huge directed graph!</p>
                        <p>This short tutorial will introduce you to Constellation’s features.</p>
                        <p>Start by clicking <b>Add</b> below! </p>
                    </div>
                );
                break;
            };
            case '&T.BASICS': {
                toDisplay = (
                    <div>
                        <p>

                        Constellation visualizes relationships in a directed network. Each node represents a single added class — in our example below, 6.009. They are colored by course. 
                        </p>
                        <img src={addImg} className = "TutorialInfo-img"/>
                        <p>Translucent <b>suggested classes</b> branch off of each class. These classes are not yet added, but include prerequisites, corequisites, and related classes, or are themselves a pre- or corequisite to the central class.</p>
                        <p>Nodes are connected with <b>edges</b>. Arrows indicate prerequisites, while diamonds convey corequisites.</p>
                        <p>
                            Continue by clicking the <b>Add</b> button below.
                        </p>
                    </div>
                )
                break;
            }
            case '&T.ADD': {
                toDisplay = (
                    <div>
                        <p>Let's try adding some classes!</p>
                        <p>In the search bar, try typing in the name of a class, and either hitting enter, or clicking the telescope icon. In our example, we'll add '6.009'. After clicking <b>Add</b>, the following should appear on your canvas.
                        </p>
                        <img src={addImg} className = "TutorialInfo-img"/>
                        <p> Hmm... 6.006 looks cool -- let's add it!</p>
                        <p>To do so, click the 6.006 node. Its information will display in the sidebar.</p>
                        <p>Then, press the <b>Add</b> button.</p>
                        <img src={addImgTwo} className = "TutorialInfo-img"/>
                        <p> Now that 6.006 is added, it is no longer faded, and displays suggestions of its own! What to add next?</p>
                        <p>What about 6.046? The edge from 6.006 to 6.046 tells us that 6.006 is a prerequisite for 6.046. Let's try adding it as before, by clicking on the node, and then clicking the <b>Add</b> button, or by searching for '6.046' in the search bar.</p>
                        <img src={addImgThree} className = "TutorialInfo-img"/>
                        <p> Speaking of prerequisites, it looks like 6.042 is a prerequisite for 6.006! Let's add it. </p>
                        <img src={addImgFour} className = "TutorialInfo-img"/>
                        <p> What could we add next? Let's explore some of the suggestions from 6.009. How about 21M.383, 'Computational Music Theory and Analysis'? </p>
                        <img src={addImgFive} className = "TutorialInfo-img"/>
                        <p> Boom, added. Looks like 21M.383 has a prerequisite - 21M.301. Let's go ahead and add that as well. </p>
                        <img src={addImgSix} className = "TutorialInfo-img"/>
                        <p> Suggested nodes make it easier to explore classes and often convey helpful information regarding requirements! </p>
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
                        <p> To remove 9.66, simply select the '9.66' node and press the <b>Remove</b> button in the sidebar. After removing, our cluster becomes: </p>
                        <img src={removeAfter} className = "TutorialInfo-img"/>
                        <p> Note that '9.66' has not disappeared completely, but has rather become translucent — a suggested class. Classes suggested only by 9.66, such as '6.036', '18.05', or '6.041', have disappeared completely.</p>
                    </div>
                )
                break;
            }
            case '&T.SEARCH': {
                toDisplay = (
                    <div>
                        <p> The search bar can be found near the top of the sidebar.</p>
                        <img src={searchImgName} className = "TutorialInfo-img"/>
                        <p> The search bar allows users to add classes not currently suggested by their network. Simply search the class name, click either the telescope or the class name in the dropdown menu, and select <b>Add</b>. </p>
                        <img src={searchImgPhrase} className = "TutorialInfo-img"/>
                    </div>
                )
                break;
            }
            case '&T.FILE': {
                toDisplay = (
                    <div>
                        <p> Constellation supports saving and loading class networks. Press <b>Add</b> to explore more! </p>
                    </div>
                )
                break;
            }
            case '&T.SAVE': {
                toDisplay = (
                    <div>
                        <p> To save your file, press the <b>Save</b> button in the navigation bar.</p>
                        <p>If your current network was saved previously, the current contents will be updated. Otherwise, you will be prompted to enter a name.</p>
                    </div>
                )
                break;
            }
            case '&T.LOAD': {
                toDisplay = (
                    <div>
                        <p> To load past networks, press the <b>Load</b> button in the navigation bar. A list of your previously saved networks will appear in the sidebar. Load a graph’s contents by pressing <b>Load</b>. </p>
                        <p>Be sure to save your current file's contents before loading!</p>
                    </div>
                )
                break;
            }
            case '&T.RESET': {
                toDisplay = (
                    <div>
                        <p> To reset your canvas, press the <b>Reset</b> button in the navigation bar. This will clear all nodes from the canvas, with the exception of the node labeled 'Click me to start'.</p>
                    </div>
                )
                break;
            }
            case '&T.NEW': {
                toDisplay = (
                    <div>
                        <p> Press the <b>New</b> button in the navigation bar to start a new canvas.</p>
                        <p>Before doing so, be sure to save your current network, if you wish to do so.  </p>
                    </div>
                )
                break;
            }
            case '&T.ABOUT': {
                toDisplay = (
                    <div>
                        <p> Constellation was created by Nicole Wong, Ben Wu, and Ezra Erives in January 2021 as part of the <b>web.lab</b> (web development) competition. This website is made possible by data from the FireRoad API, the <b>vis.js</b> and <b>React.js</b> libraries, and, of course, the wonderful teaching staff at <b>web.lab 2021</b>! </p>
                    </div>
                )
                break;
            }
            case '&T.FILTER': {
                toDisplay = (
                    <div>
                        <p> Constellation allows you to filter your current network by toggling whether or not certain courses, or suggestions, are visible in your network. Let's walk through an example. Suppose you're a Course 6 major, and don't want any Course 18 classes (the green nodes below) popping up in your network, which looks like the one shown below. </p>
                        <img src={filterImgOne} className = "TutorialInfo-img"/>
                        <p> To filter out Course 18, click the hamburger menu in the upper left corner, and click the <b>filter</b> button. Filter settings will pop up in the display bar. </p>
                        <img src={filterImgTwo} className = "TutorialInfo-img"/>
                        <p> Uncheck the button labeled <b>Show Course 18 (Mathematics)</b>. Your network should then update to look something like the below. </p>
                        <img src={filterImgThree} className = "TutorialInfo-img"/>
                        <p> Suppose we now further wish to see only the classes we've added. To do so, navigate again to the filter settings, as shown below.</p>
                        <img src={filterImgFive} className = "TutorialInfo-img"/>
                        <p> After unchecking <b> Show Suggested Nodes </b>, your network should look something like the one below. </p>
                        <img src={filterImgFour} className = "TutorialInfo-img"/>
                        <p> Filtering does not affect the underlying data set. When you save a network, the filter settings will also be saved. If an added node does not appear, be sure to check that you are not filtering out that course! This will cause the node to appear to have not been added, when really you have just rendered it invisible. </p>
                    </div>
                )
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