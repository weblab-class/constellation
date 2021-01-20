import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";
import CanvasOptions from "../modules/CanvasOptions.js";

//import NamePopUp from "../modules/NamePopUp.js";

import "./Explorer.css";

import { get, post} from "../../utilities";

/**
 * Explorer page. Where all the main features are: canvas, sidebar
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {Function} handleLogout passed to CanvasOptions
 */

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newClass: '', //This prompts Vis to add things
            currentlyViewedClass: '', //the class currently being shown on display bar
            newClassesToAdd: {
                prereqsToAdd: [],
                coreqsToAdd: [],
                afterreqsToAdd: [],
            },
            canvasToBeReset: 0,
            removeClass: '',
            saveCanvasCounter: 0,
            loadCollectionCounter: 0,
            courseObject: undefined,
            isDisplayCollections: false,
            isDisplayGetName : false, //This is used to conditionally render the future pop up
            removeClass: '', //Prompts Vis to remove a class
            currentCollectionName: null, //The collection to load in Vis
            collectionsArray: [], //array of collection names for the user
            loaded: false,
        }
    }

    setCourseObject = (input) => {
        get("/api/sidebarNode", { subjectId: input }).then((courseArray) => {
            if (courseArray.length === 0) {
                this.setState({
                    courseObject: {
                        found: false,
                        searchedText: input
                    }
                });
            }
            else {
                const courseObjectFromAPI = courseArray[0];
                console.log(courseObjectFromAPI);
                this.setState({
                    courseObject: {
                        found: true,
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
            newClass: this.state.courseObject.subjectId,
        });

    }

    handleRemoveClass = () => {

        //Triggers VisNetwork to remove a class
        
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
        });
    }

    setToNoCollections = () => {
        this.setState({
            isDisplayCollections: false,
        });
    }

    handleSaveCollection = () => {
        // Activates the pop-up to save collection
        this.setState({
            saveCanvasCounter: this.state.saveCanvasCounter + 1,
        });
        
    }
    
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
        });
    }

    handleNewName = async (responseText) => {

        //post MVP function: for user input for collection name

        //To be passed down into the button namePopUp
        //This will retrieve the name 

        if (responseText in this.state.collectionsArray){

            //TODO: Need to test this after doing the POST request.
            // Prompt the user to enter a new name from the front end.
            // TODO: Loop re-rendering instead of just exiting the loop and making the user re-click save canvas.

            console.log("Collection name already exists in your collections. Please return to save canvas and input a distinct name.");
            console.log("TODO: Prompt re-rendering of the valid input variable in the pop-up.");
            
            return;
        }
        else{
            //note to self: tested below
            this.setState({currentCollectionName : responseText});
            this.setState({isDisplayGetName : false}); //Mark name as received.
        }
    }


    postNetwork = (graphObject) => {

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

    exportNetwork = (graphObject) => {

        //Will be prompted by VisNetwork in a callback.

        if (!this.state.currentCollectionName){

            const nextName = String(Date.now());

            //Generate a random name (like a long string of numbers)
            //NOTE TO SELF: Does not guarantee no collisions which is needed later.

            // This will reply to the Explorer by triggering handleNewName
            // in an input loop, until the user gives the right response.

            //set the name directly here.

            //DO NOT DELETE THE BELOW COMMENTS -- will be used later.

            //console.log("The pop up will now be displayed.")
            //this.setState({isDisplayGetName : true}); //Need to write pop up logic.

            //Below will be allocated to handleNewName later.
            this.setState({currentCollectionName : nextName }, () => {
                this.postNetwork(graphObject);
            });
        }
        else{
            this.postNetwork(graphObject);
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
            return networkObject;
            
        } catch (err) {
                console.log("There was an error loading a collection for the user. Specific error message:", err.message);
        }
       
    }
    // componentDidMount() {}

    //BELOW: Change the NamePopUp to be a real popup
    render() {
        return (
            <div className="Explorer-all">
                <div className="Explorer-container">
                    <div className="Explorer-canvas">
                        <CanvasOptions
                            handleSaveCollection={this.handleSaveCollection}
                            handleUserCollections={this.handleUserCollections}
                            resetCanvas={this.handleResetCanvas}
                            isDisplayCollections={this.state.isDisplayCollections}
                            handleLogout={this.props.handleLogout}
                        />
                        <Canvas
                            exportNetwork={this.exportNetwork}
                            newClass={this.state.newClass}
                            getNeighbors={this.getNeighbors}
                            removeClass={this.state.removeClass}
                            canvasToBeReset={this.state.canvasToBeReset}
                            saveCanvasCounter={this.state.saveCanvasCounter}
                            loadCollectionCounter={this.state.loadCollectionCounter}
                            setCourseObject={this.setCourseObject}
                            getLoadCollectionInfo={this.getLoadCollectionInfo}
                            importNetwork = {this.importNetwork}
                        />
                    </div>
                    <div className="Explorer-sideBar">
                        <SideBar
                            handleSearch={this.handleSearch}
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
            </div>
        )
    }
}

export default Explorer;