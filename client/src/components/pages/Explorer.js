import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";
import CanvasOptions from "../modules/CanvasOptions.js";
import _ from "lodash"; //debounce function

//import NamePopUp from "../modules/NamePopUp.js";

import "./Explorer.css";

import { get, post} from "../../utilities";
import { GiTrumpet } from "react-icons/gi";

/**
 * Explorer page. Where all the main features are: canvas, sidebar
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {Function} handleLogout passed to CanvasOptions
 */

 const TUTORIAL_PREREQS = {
    '&T.START': [],
    '&T.GRAPH': ['&T.START'],
    '&T.ADD': ['&T.START'],
    '&T.REMOVE': ['&T.START'],
    '&T.FILE': ['&T.START'],
    '&T.SAVE': ['&T.FILE'],
    '&T.LOAD': ['&T.FILE'],
    '&T.NEW': ['&T.FILE'],
    '&T.RESET': ['&T.START'],
    '&T.ABOUT': ['&T.START'],
 }

 const TUTORIAL_AFTERREQS = {
    '&T.START': ['&T.GRAPH','&T.ADD','&T.REMOVE','&T.FILE','&T.RESET'],
    '&T.GRAPH': [],
    '&T.ADD': [],
    '&T.REMOVE': [],
    '&T.FILE': ['&T.SAVE','&T.LOAD', '&T.NEW'],
    '&T.SAVE': [],
    '&T.LOAD': [],
    '&T.RESET': [],
    '&T.NEW': [],
    '&T.ABOUT': [],
 }

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
            courseObject: undefined,
            isDisplayCollections: false,
            newCollectionNameCounter : 0,
            isSaved : false,
            isSavedCounter : 0,
            removeClass: '', //Prompts Vis to remove a class
            currentCollectionName: null, //The collection to load in Vis
            collectionsArray: [], //array of collection names for the user
            loaded: false,
        }
    }


    setCourseObject = (input) => {
        //first check if being set to tutorial
        console.log("Setting course object to: " + input);
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
                        searchedText: input,
                    }
                });
            }
            else {
                const courseObjectFromAPI = courseArray[0];
                console.log(courseObjectFromAPI);
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
            console.log("There was an error retrieving a course object for a side bary query. Specific error message:", err.message);
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
        return get("/api/graphNode", { subjectId: inputText }).then((graphInfo) => {
            const newClassesToAdd = {
                prereqsToAdd: graphInfo[0].prerequisites.map(classId => classId.trim()),
                coreqsToAdd: graphInfo[0].corequisites.map(classId => classId.trim()),
                afterreqsToAdd: graphInfo[0].afterSubjects.map(classId => classId.trim()),
            };
            console.log(newClassesToAdd);
            return newClassesToAdd;
        }).catch((err) => {
            console.log("There was an error retrieving classes.");
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
            isSaved : false,
            isSavedCounter : this.state.isSavedCounter + 1,
            newClass: this.state.courseObject.subjectId,
            newClassCounter: this.state.newClassCounter+1,
        });

    }

    handleRemoveClass = () => {
        //Triggers VisNetwork to remove a class
        this.setState({
            removeClass: this.state.courseObject.subjectId,
            removeClassCounter: this.state.removeClassCounter+1,
            isSaved : false,
            isSavedCounter : this.state.isSavedCounter + 1,
        });
    }

    handleLoadCollection = (collectionName) => {

        //Triggers VisNetwork loading of a collection
      
        if(!collectionName) {
            console.log("current collection name is undefined");
            return;
        }
        this.setState({
            loadCollectionCounter: this.state.loadCollectionCounter + 1,
            currentCollectionName: collectionName,
            isDisplayCollections: false,
            loaded: false,
            isSaved : true,
            isSavedCounter : this.state.isSavedCounter + 1,
        });
    }

    setToNoCollections = () => {
        this.setState({
            isDisplayCollections: false,
        });
    }

    setCollectionName = (newName) => {
        this.setState({
            currentCollectionName : newName
        })    
    }

    //also passed as prop to name collections
    tellVisNetworkToExport = () => {
        this.setState({
            saveCanvasCounter: this.state.saveCanvasCounter+1,
            isSaved : true,
        }, () => {
            this.setState({isSavedCounter : this.state.isSavedCounter + 1});
            console.log("Told saved counter to increment in explorer");
        });
        
    }

    handleSaveCollection = _.debounce(() => {
        // Activates NameCollection to save collection, activates network save
        if(!this.state.currentCollectionName){ //This activates the conditional rendering for name collection.
            console.log("Collection name is undefined.")
            this.setState({
                newCollectionNameCounter : this.state.newCollectionNameCounter+1, //passed as a prop to name collection
                //Note that the tellVisNetworkToExport is called within Name Collection,
                // to ensure that the name is set properly.
            });
        }else{
            this.tellVisNetworkToExport();
        }
    }, 1000);

    handleUserCollections = () => {

        //  Activates display of SideBar with collection options
        // Will require an API request for all of the collection names

        // 1/16: setState is async
        // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

        this.setState({
            isDisplayCollections: true,
            //collectionsArray: ["asdf", "sdfa", "dfas", "fasd", "asdfasdfasdf", "asdfasdffdsa", "asdfafdsasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"],
        });

        get("/api/collectionNames").then((collectionsArrayFromAPI) => {
            console.log(collectionsArrayFromAPI);
            if (collectionsArrayFromAPI.length > 0) {
                this.setState({ collectionsArray: collectionsArrayFromAPI[0].names });
            }
        }).catch((err) => {
            console.log("There was an error retrieving collections for the user. Specific error message:", err.message);
        });

    }


    handleResetCanvas = () => {
        this.setState({
            canvasToBeReset: this.state.canvasToBeReset + 1,
            newClass: '',
            removeClass: '',
        });

        this.setState({
            isSaved : false,
            isSavedCounter : this.state.isSavedCounter + 1,
        });
    }

    exportNetwork = (graphObject) => {

        //Will be prompted by VisNetwork in a callback.
        //handleSaveCollection should guarantee that valid name will be set,
        //  before this function (or even Vis saving) is ever prompted.

        console.log("Posting the current name : "+this.state.currentCollectionName);
        post("/api/saveCollection", {
            
            collectionName : this.state.currentCollectionName,
            nodeArray : graphObject.nodes,
            edgeArray : graphObject.edges

        }).catch((err) => {
            console.log("There was an error loading a collection for the user. Specific error message:", err.message);
        });

        //Need to also add a name to the list of current collections that can be loaded (via setState)
        if (!(this.state.collectionsArray.includes(this.state.currentCollectionName))){
            this.setState({ collectionsArray : [... this.state.collectionsArray].concat([this.state.currentCollectionName])});
        }
    }

    setToLoaded = () => {
        this.setState({
            loaded: true,
        });
    }

    importNetwork = async () => {
        //uses this.state.collectionName
        //returns network object so that Vis can use it

        try{
            const networkObject = await get("/api/loadCollection", {
                collectionName : this.state.currentCollectionName
            });
            if (!networkObject){
                console.log("Network object is null or undefined! No network was retrieved.")
            }
            return networkObject;
            
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
        });
    }

    // componentDidMount() {}

    //BELOW: Change the NamePopUp to be a real popup
    render() {
        return (
                <div className="Explorer-container">
                    <div className="Explorer-canvas">
                        <CanvasOptions
                            handleSaveCollection={this.handleSaveCollection}
                            handleUserCollections={this.handleUserCollections}
                            resetCanvas={this.handleResetCanvas}
                            isDisplayCollections={this.state.isDisplayCollections}
                            currentCollectionName={this.state.currentCollectionName}
                            newCollectionNameCounter={this.state.newCollectionNameCounter}
                            isSaved={this.state.isSaved}
                            isSavedCounter={this.state.isSavedCounter}
                            setCollectionName={this.setCollectionName}
                            tellVisNetworkToExport={this.tellVisNetworkToExport}
                            handleLogout={this.props.handleLogout}
                            handleNewCollection={this.handleNewCollection}
                        />
                        <Canvas
                            exportNetwork={this.exportNetwork}
                            newClass={this.state.newClass}
                            newClassCounter={this.state.newClassCounter}
                            getNeighbors={this.getNeighbors}
                            removeClass={this.state.removeClass}
                            removeClassCounter={this.state.removeClassCounter}
                            canvasToBeReset={this.state.canvasToBeReset}
                            saveCanvasCounter={this.state.saveCanvasCounter}
                            loadCollectionCounter={this.state.loadCollectionCounter}
                            setCourseObject={this.setCourseObject}
                            importNetwork = {this.importNetwork}
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
                        />
                    </div>
                </div>
        )
    }
}

export default Explorer;