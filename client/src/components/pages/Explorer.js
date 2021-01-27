import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";
import CanvasOptions from "../modules/CanvasOptions.js";
import InfoPanel from "../modules/InfoPanel.js";
import _ from "lodash"; //debounce function

//import NamePopUp from "../modules/NamePopUp.js";

import "./Explorer.css";

import { get, post } from "../../utilities";

/**
 * Explorer page. Where all the main features are: canvas, sidebar
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {Function} handleLogout passed to CanvasOptions
 */

 const TUTORIAL_PREREQS = {
    '&T.START': [],
    '&T.BASICS': ['&T.START'],
    '&T.ADD': ['&T.BASICS'],
    '&T.REMOVE': ['&T.BASICS'],
    '&T.SEARCH': ['&T.BASICS'],
    '&T.FILE': ['&T.START'],
    '&T.SAVE': ['&T.FILE'],
    '&T.LOAD': ['&T.FILE'],
    '&T.NEW': ['&T.FILE'],
    '&T.RESET': ['&T.BASICS'],
    '&T.ABOUT': ['&T.START'],
    '&T.FILTER': ['&T.BASICS'],
 }

 const TUTORIAL_AFTERREQS = {
    '&T.START': ['&T.BASICS','&T.FILE','&T.ABOUT'],
    '&T.BASICS': ['&T.ADD','&T.REMOVE','&T.SEARCH','&T.RESET','&T.FILTER'],
    '&T.ADD': [],
    '&T.REMOVE': [],
    '&T.SEARCH': [],
    '&T.FILE': ['&T.SAVE','&T.LOAD', '&T.NEW'],
    '&T.SAVE': [],
    '&T.LOAD': [],
    '&T.RESET': [],
    '&T.NEW': [],
    '&T.ABOUT': [],
    '&T.FILTER': [],
 }


//manually override the following classes which have obstructive numbers of afterreqs
const RESTRICT_SUGGESTIONS = []; //currently empty, problem resolved via dynamic filtering capability

//GIRS and generic equivalents for referencse
// '8.01','8.011','8.01L','8.012'
// '8.02','8.021','8.022'
// '18.01','18.01A'
// '18.02', '18.02A'

//replacements
//TODO - MANUALLY "ADD IN SOME AFTER-CLASSES" (especially for 18.03 and 18.06)
const RESTRICT_REPLACEMENTS = {
    '8.02': {
        prereqsToAdd: ['8.01','8.011','8.01L','8.012','18.01','18.01A'],
        coreqsToAdd: ['18.02', '18.02A'],
        afterreqsToAdd: [],
    }, 
    '8.022': {
        prereqsToAdd: ['8.01','8.011','8.01L','8.012','18.01','18.01A'],
        coreqsToAdd: ['18.02', '18.02A'],
        afterreqsToAdd: [],
    }, 
    '18.02': {
        prereqsToAdd: ['18.01','18.01A'],
        coreqsToAdd: [],
        afterreqsToAdd: [],
    }, 
    '18.02A': {
        prereqsToAdd: ['18.01','18.01A'],
        coreqsToAdd: [],
        afterreqsToAdd: [],
    }, 
    '18.022': {
        prereqsToAdd: ['18.01','18.01A'],
        coreqsToAdd: [],
        afterreqsToAdd: [],
    }, 
    '18.03': {
        prereqsToAdd: [],
        coreqsToAdd: [],
        afterreqsToAdd: ['5.73'],
    },
    '18.06': {
        prereqsToAdd: ['18.02', '18.02A'],
        coreqsToAdd: [],
        afterreqsToAdd: [],
    },
}

let timer = 0;



class Explorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newClass: '', //This prompts Vis to add things
            newClassCounter: 0,
            currentlyViewedClass: '', //the class currently being shown on display bar
            newClassesToAdd: {
                prereqsToAdd: [],
                coreqsToAdd: [],
                afterreqsToAdd: [],
            },
            canvasToBeReset: 0,
            removeClass: '',
            removeClassCounter: 0,
            saveCanvasCounter: 0,
            loadCollectionCounter: 0,
            switchedCollectionCounter : 0,
            courseObject: undefined,
            isDisplayCollections: false,
            newCollectionNameCounter: 0,
            isSaved: false,
            isSavedCounter: 0,
            removeClass: '', //Prompts Vis to remove a class
            currentCollectionName: null, //The collection to load in Vis
            collectionsArray: [], //array of collection names for the user
            loaded: false,
            popupMessage: "popup",
            filterToToggle: '',
            filterCounter: 0,
            filterObject: {
                'suggestion': true, //whether or not to view suggestions
                '&T':true, //tutorial
                "1":true,
                "2":true,
                "3":true, 
                "4":true,
                "5":true,
                "6":true,
                "7":true,
                "8":true,
                "9":true,
                "10":true,
                "11":true,
                "12":true,
                "14":true,
                "15":true,
                "15":true,
                "16":true,
                "17":true,
                "18":true,
                "20":true,
                "21":true,
                "21A":true,
                "21H":true,
                "21G":true,
                "21L":true,
                "21M":true,
                "21W":true,
                "22":true,
                "24":true,
                "AS":true,
                "CC":true,
                "CMS":true,
                "CSB":true,
                "EC":true,
                "EM":true,
                "ES":true,
                "HST":true,
                "IDS":true,
                "MAS":true,
                "MS":true,
                "NS":true,
                "SCM":true,
                "SP":true,
                "STS":true,
                "WGS":true,
              }
        }
    }

    setToInactivePopup = () => {
        //console.log("timer:", timer);
        if (timer !== 0) {
            clearTimeout(timer);
            timer = 0;
        }
    
        timer = setTimeout(() => {
            timer = 0;
            this.setState({
                popupMessage: "popup"
            })
        }, 1500);
    };


    setCourseObject = (input) => {
        //first check if being set to tutorial
        const orig_input = input;
        input = input.split(' ')[0];
        if(input.length > 0 && input[input.length-1] === ":") {
            input = input.slice(0, input.length-1);
        }

        //console.log("Setting course object to: " + input);
        if(input.includes('&')){
            this.setState({
                courseObject: {
                    found: true,
                    tutorial: true,
                    subjectId: input,
                }
            });
            return;
        }
        get("/api/sidebarNode", { subjectId: input }).then((courseArray) => {
            if (courseArray.length === 0) {
                this.setState({
                    courseObject: {
                        found: false,
                        tutorial: false,
                        searchedText: orig_input,
                    }
                });
            }
            else {
                const courseObjectFromAPI = courseArray[0];
                //console.log(courseObjectFromAPI);
                this.setState({
                    courseObject: {
                        found: true,
                        tutorial: false,
                        searchedText: input,
                        prerequisites: courseObjectFromAPI.prerequisites,
                        subjectId: courseObjectFromAPI.subjectId,
                        title: courseObjectFromAPI.title,
                        description: courseObjectFromAPI.description,
                        offeredIAP: courseObjectFromAPI.offeredIAP,
                        offeredFall: courseObjectFromAPI.offeredFall,
                        offeredSpring: courseObjectFromAPI.offeredSpring,
                        offeredSummer: courseObjectFromAPI.offeredSummer
                    },
                });
            }

        }).catch((err) => {
            //console.log("There was an error retrieving a course object for a side bary query. Specific error message:", err.message);
        });
    }


    //returns neighbors for the class and updates state so that network re-renders
    getNeighbors = (inputText) => {
        if(inputText.includes('&')){
            const newClassesToAdd = {
                prereqsToAdd: TUTORIAL_PREREQS[inputText],
                coreqsToAdd: [],
                afterreqsToAdd: TUTORIAL_AFTERREQS[inputText],
            }
            return newClassesToAdd;
        }
        else if(RESTRICT_SUGGESTIONS.includes(inputText)){
            return RESTRICT_REPLACEMENTS[inputText];
        }
        return get("/api/graphNode", { subjectId: inputText }).then((graphInfo) => {
            const newClassesToAdd = {
                prereqsToAdd: graphInfo[0].prerequisites.map(classId => classId.trim()),
                coreqsToAdd: graphInfo[0].corequisites.map(classId => classId.trim()),
                afterreqsToAdd: graphInfo[0].afterSubjects.map(classId => classId.trim()),
            };
            //console.log(newClassesToAdd);
            return newClassesToAdd;
        }).catch((err) => {
            //console.log("There was an error retrieving classes.");
            const newClassesToAdd = {
                prereqsToAdd: [],
                coreqsToAdd: [],
                afterreqsToAdd: [],
            };
            return newClassesToAdd;
        });
    }

    handleAddClass = async (inputText) => {

        //Triggers VisNetwork to add a class
        this.setState({
            isSaved: false,
            isSavedCounter: this.state.isSavedCounter + 1,
            newClass: this.state.courseObject.subjectId,
            newClassCounter: this.state.newClassCounter + 1,
        });

    }

    handleRemoveClass = () => {
        //Triggers VisNetwork to remove a class
        this.setState({
            removeClass: this.state.courseObject.subjectId,
            removeClassCounter: this.state.removeClassCounter + 1,
            isSaved: false,
            isSavedCounter: this.state.isSavedCounter + 1,
        });
    }

    handleLoadCollection = (collectionName) => {

        //Triggers VisNetwork loading of a collection

        if (!collectionName) {
            //console.log("current collection name is undefined");
            return;
        }
        this.setState({
            loadCollectionCounter: this.state.loadCollectionCounter + 1,
            currentCollectionName: collectionName,
            isDisplayCollections: false,
            loaded: false,
            isSaved : true,
            isSavedCounter : this.state.isSavedCounter + 1,
            switchedCollectionCounter : this.state.switchedCollectionCounter + 1,
        });
    }

    setToNoCollections = () => {
        this.setState({
            isDisplayCollections: false,
            optionsAreDisplayed: false,
            popupMessage: "exiting...",
        }, this.setToInactivePopup);
    }

    setCollectionName = (newName) => {
        this.setState({
            currentCollectionName: newName
        })
    }

    //also passed as prop to name collections
    tellVisNetworkToExport = () => {
        this.setState({
            saveCanvasCounter: this.state.saveCanvasCounter + 1,
            isSaved: true,
        }, () => {
            this.setState({ isSavedCounter: this.state.isSavedCounter + 1 });
            console.log("Told saved counter to increment in explorer");
        });

    }

    handleSaveCollection = () => {
        // Activates NameCollection to save collection, activates network save
        if (!this.state.currentCollectionName) { //This activates the conditional rendering for name collection.
            //console.log("Collection name is undefined.")
            this.setState({
                newCollectionNameCounter: this.state.newCollectionNameCounter + 1, //passed as a prop to name collection
                //Note that the tellVisNetworkToExport is called within Name Collection,
                // to ensure that the name is set properly.
            });
        } else {
            console.log("has name already, telling visnetwork to export");
            this.tellVisNetworkToExport();
        }
    };

    handleUserCollections = () => {

        //  Activates display of SideBar with collection options
        // Will require an API request for all of the collection names

        // 1/16: setState is async
        // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

        
        get("/api/collectionNames").then((collectionsArrayFromAPI) => {
            //console.log(collectionsArrayFromAPI);
            if (collectionsArrayFromAPI.length > 0) {
                this.setState({ collectionsArray: collectionsArrayFromAPI[0].names });
            }
        }).catch((err) => {
            console.log("There was an error retrieving collections for the user. Specific error message:", err.message);
        });

        this.setState({
            isDisplayCollections: true,
            popupMessage: "constellations loaded..."
            //collectionsArray: ["asdf", "sdfa", "dfas", "fasd", "asdfasdfasdf", "asdfasdffdsa", "asdfafdsasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"],
        }, this.setToInactivePopup);


    };


    handleResetCanvas = () => {
        this.setState({
            canvasToBeReset: this.state.canvasToBeReset + 1,
            newClass: '',
            removeClass: '',
            isSaved: false,
            isSavedCounter: this.state.isSavedCounter + 1,
            popupMessage: 'current canvas cleared!'
        }, this.setToInactivePopup)
    };

    exportNetwork = (graphObject) => {

        //Will be prompted by VisNetwork in a callback.
        //handleSaveCollection should guarantee that valid name will be set,
        //  before this function (or even Vis saving) is ever prompted.

        //console.log("Posting the current name : " + this.state.currentCollectionName);
        //console.log("UPLOADING NETWORK TO MONGO");
        //console.log("NETWORK BEING SAVED: ");
        //console.log(graphObject);
        console.log("we've reached exportNetwork");
        post("/api/saveCollection", {

            collectionName: this.state.currentCollectionName,
            nodeArray: graphObject.nodes,
            edgeArray: graphObject.edges,
            filterObject: graphObject.filterObject,

        }).then(() => {
            console.log("post request completed to save");
        }).catch((err) => {
            console.log("There was an error loading a collection for the user. Specific error message:", err.message);
        });

        //Need to also add a name to the list of current collections that can be loaded (via setState)
        if (!(this.state.collectionsArray.includes(this.state.currentCollectionName))) {
            this.setState({ collectionsArray: [... this.state.collectionsArray].concat([this.state.currentCollectionName]) });
        }
    }

    setToLoaded = () => {
        this.setState({
            loaded: true,
        });
    }


    //converts filter array from mongoDB to filter object of the form easily usable by visNetwork and Options
    arrayToObject = (filterArray) => {
        const filterObject = {
            'suggestion': filterArray[0], //whether or not to view suggestions
            '&T':filterArray[1], //tutorial
            "1":filterArray[2],
            "2":filterArray[3],
            "3":filterArray[4], 
            "4":filterArray[5],
            "5":filterArray[6],
            "6":filterArray[7],
            "7":filterArray[8],
            "8":filterArray[9],
            "9":filterArray[10],
            "10":filterArray[11],
            "11":filterArray[12],
            "12":filterArray[13],
            "14":filterArray[14],
            "15":filterArray[15],
            "15":filterArray[16],
            "16":filterArray[17],
            "17":filterArray[18],
            "18":filterArray[19],
            "20":filterArray[20],
            "21":filterArray[21],
            "21A":filterArray[22],
            "21H":filterArray[23],
            "21G":filterArray[24],
            "21L":filterArray[25],
            "21M":filterArray[26],
            "21W":filterArray[27],
            "22":filterArray[28],
            "24":filterArray[29],
            "AS":filterArray[30],
            "CC":filterArray[31],
            "CMS":filterArray[32],
            "CSB":filterArray[33],
            "EC":filterArray[34],
            "EM":filterArray[35],
            "ES":filterArray[36],
            "HST":filterArray[37],
            "IDS":filterArray[38],
            "MAS":filterArray[39],
            "MS":filterArray[40],
            "NS":filterArray[41],
            "SCM":filterArray[42],
            "SP":filterArray[43],
            "STS":filterArray[44],
            "WGS":filterArray[45],
        }
        return filterObject;
    }

    importNetwork = async () => {
        //uses this.state.collectionName
        //returns network object so that Vis can use it

        try {
            const networkObject = await get("/api/loadCollection", {
                collectionName: this.state.currentCollectionName
            });
            if (!networkObject) {
                //console.log("Network object is null or undefined! No network was retrieved.")
            }
            const filterArray = networkObject.filterObject;
            const filterObject = this.arrayToObject(filterArray);
            this.setState({
                filterObject: filterObject,
            });
            const refinedNetworkObject = {
                nodeArray: networkObject.nodeArray,
                edgeArray: networkObject.edgeArray,
                filterObject: filterObject,
            }
            return refinedNetworkObject;

        } catch (err) {
            console.log("There was an error loading a collection for the user. Specific error message:", err.message);
        }

    }

    handleNewCollection = () => {

        this.handleResetCanvas(); //This will clear the canvas itself
        this.setState({
            currentCollectionName : null, //This will exit saving/loading on top of the old canvas
            isSaved : false,
            isSavedCounter : this.state.isSavedCounter + 1,
            switchedCollectionCounter : this.state.switchedCollectionCounter + 1,
            popupMessage: "New collection created!"
        }, this.setToInactivePopup);
    };

    displayOptions = () => {
        this.setState({
            optionsAreDisplayed: true,
            popupMessage: "filters loaded..."
        },this.setToInactivePopup);
    }

    toggleFilterValue = (filterId) => {
        let newFilterObject = {};
        Object.keys(this.state.filterObject).forEach((key) => {
            newFilterObject[key] = (key === filterId) ? (!this.state.filterObject[key]) : this.state.filterObject[key];
        });
        this.setState({  
            isSaved: false,
            isSavedCounter: this.state.isSavedCounter + 1,
            filterToToggle: filterId,
            filterCounter: this.state.filterCounter+1,
            filterObject: newFilterObject,   
        });
    };

    // componentDidMount() {}

    //BELOW: Change the NamePopUp to be a real popup
    render() {
        return (
            <div className="Explorer-containerOuter">
                <div className="Explorer-containerInner">
                    <div className="Explorer-canvas">
                        <CanvasOptions
                            handleSaveCollection={this.handleSaveCollection}
                            handleUserCollections={this.handleUserCollections}
                            resetCanvas={this.handleResetCanvas}
                            isDisplayCollections={this.state.isDisplayCollections}
                            currentCollectionName={this.state.currentCollectionName}
                            newCollectionNameCounter={this.state.newCollectionNameCounter}
                            switchedCollectionCounter={this.state.switchedCollectionCounter}
                            isSaved={this.state.isSaved}
                            isSavedCounter={this.state.isSavedCounter}
                            setCollectionName={this.setCollectionName}
                            tellVisNetworkToExport={this.tellVisNetworkToExport}
                            handleLogout={this.props.handleLogout}
                            handleNewCollection={this.handleNewCollection}
                            displayOptions={this.displayOptions}
                            optionsAreDisplayed={this.state.optionsAreDisplayed}
                        />
                        <Canvas
                            exportNetwork={this.exportNetwork}
                            newClass={this.state.newClass}
                            newClassCounter={this.state.newClassCounter}
                            getNeighbors={this.getNeighbors}
                            removeClass={this.state.removeClass}
                            removeClassCounter={this.state.removeClassCounter}
                            filterToToggle={this.state.filterToToggle}
                            filterCounter={this.state.filterCounter}
                            canvasToBeReset={this.state.canvasToBeReset}
                            saveCanvasCounter={this.state.saveCanvasCounter}
                            loadCollectionCounter={this.state.loadCollectionCounter}
                            setCourseObject={this.setCourseObject}
                            importNetwork={this.importNetwork}
                        />
                    </div>
                    <div className="Explorer-sideBar">
                        <SideBar
                            setCourseObject={this.setCourseObject}
                            courseObject={this.state.courseObject}
                            collectionObject={this.state.collectionObject}
                            handleAddClass={this.handleAddClass}
                            handleRemoveClass={this.handleRemoveClass}
                            handleLoadCollection={this.handleLoadCollection}
                            setToNoCollections={this.setToNoCollections}
                            canvasToBeReset={this.state.canvasToBeReset}
                            isDisplayCollections={this.state.isDisplayCollections}
                            collectionsArray={this.state.collectionsArray}
                            setToLoaded={this.setToLoaded}
                            loaded={this.state.loaded}
                            optionsAreDisplayed={this.state.optionsAreDisplayed}
                            toggleFilterValue = {this.toggleFilterValue}
                            filterObject = {this.state.filterObject}
                        />
                    </div>
                </div>
                <InfoPanel 
                    popupMessage = {this.state.popupMessage}
                />
            </div>
        )
    }
}

export default Explorer;