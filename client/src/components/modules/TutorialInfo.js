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
                    <p> Constellation allows you to explore the MIT course catalog in a manner reflecting that which it truly is - a huge directed graph! 
                        This short tutorial will guide you through the basics of using Constellation. To start, click the <b>Add</b> button below! </p>
                );
                break;
            };
            case '&T.BASICS': {
                toDisplay = (
                    <div>
                        <p>
                            Constellation displays course information in a directed network. Below, our network consists of a sigle added class - '6.009', Fundamentals of Programming. Branching off of '6.009' are many <b>suggested classes</b>. <b>Suggested classes</b> are those which have not yet been added, but which are either prerequisites to an added class, or themselves have an added class as a prerequisite. 
                        </p>
                        <img src={addImg} className = "TutorialInfo-img"/>
                        <p>
                            You'll notice that there are several additional important visual features at play - we'll address each of them below. 
                            <ol>
                                <li><b>Color: </b> Nodes are colored in accordance to which course their classes belong to. In the picture, '6.009', belongign to course six, is colored red.</li>
                                <li><b>Opacity: </b>'6.009' is opaque while the nodes emanating from it are translucent. This is because '6.009' has been added while the remaining translucent nodes are merely suggestions.</li>
                                <li><b>Edge labels:</b> These arrows convey prerequisite information, while less commonly appearing diamonds convey corequisite information.</li>
                            </ol>
                        </p>
                        <p>
                            To continue, click the <b>Add</b> button below.
                        </p>
                    </div>
                )
                break;
            }
            case '&T.ADD': {
                toDisplay = (
                    <div>
                        <p>
                            Let's try adding some classes! Before we do, note that to return to this tutorial after adding a class, simply reclick the 'Adding' node. In the search bar, try typing in the name of a class, and either hitting enter, or clicking the telescope icon. In our example, we'll use '6.009', Fundamentals of Programming.
                        After clicking the <b>Add</b> button, the following should appear on your canvas.
                        </p>
                        <img src={addImg} className = "TutorialInfo-img"/>
                        <p> Hmm... 6.006 looks cool - you've heard it's a cool class. Let's add it! To do so, we can click the 6.006 node, which will cause course information for 6.006 to show up in the display bar on the right. Then, press the <b>Add</b> button. Alternatively, insted of clicking on the 6.006 node, we could have searched for it in the search  bar.</p>
                        <img src={addImgTwo} className = "TutorialInfo-img"/>
                        <p> Now that 6.006 is added, it is no longer faded, and displays suggestions of its own! What to add next? What about 6.046? The edge from 6.006 to 6.046 tells us that 6.006 is a prerequisite for 6.046. Let's try adding it as before, by clicking on the node, and then clicking the <b>Add</b> button, or by searching '6.046' in the searchbar. </p>
                        <img src={addImgThree} className = "TutorialInfo-img"/>
                        <p> Speaking of prerequisites, it looks like 6.042 is a prerequisite for 6.006! Let's add it. </p>
                        <img src={addImgFour} className = "TutorialInfo-img"/>
                        <p> What could we add next? Let's explore some of the suggestions from 6.009. How about 21M.383, 'Computational Music Theory and Analysis'? </p>
                        <img src={addImgFive} className = "TutorialInfo-img"/>
                        <p> Boom, added. Looks like 21M.383 has a prerequisite - 21M.301. Let's go ahead and add that as well. </p>
                        <img src={addImgSix} className = "TutorialInfo-img"/>
                        <p> And so on and so forth... The moral of the story is that suggested nodes make it easier to add classes related to those you have already added, and aften convey helpful information regarding prerequisites! </p>
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
            case '&T.SEARCH': {
                toDisplay = (
                    <div>
                        <p> This section covers the search bar, which can be found near the top of the side bar. Along with clicking nodes already added to the network, the search bar is the second main way to bring up information for a particular class in the display bar. Suppose there's a class, say 6.0001, which is not yet in your network (as an added class, or a suggestion) that you wish to add. We can use the search bar to add the class! </p>
                        <img src={searchImgName} className = "TutorialInfo-img"/>
                        <p> By clicking 6.0001 in the dropdown menu, and then pressing enter, the 6.0001 will be searched, and its information will appear in the display bar. Alternatively, you can ignore the dropdown menu and simply type in the class you wish to search, and press either enter or the telescope search bar. Suppose however that you don't know the class name, and that you wish instead to search for a topic - let's say 'machine learning'. Simply begin typing 'machine learning' into the search bar and voila - the search bar will suggest classes related to your search, as shown below. </p>
                        <img src={searchImgPhrase} className = "TutorialInfo-img"/>
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
                        <p> To reset your canvas, press the <b>Reset</b> button in the navigation bar. This will clear all nodes from the canvas, with the exception of the node labeled 'Click me to start'.</p>
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