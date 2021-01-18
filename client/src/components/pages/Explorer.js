import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";
import CanvasOptions from "../modules/CanvasOptions.js";


import "./Explorer.css";

import { get } from "../../utilities";

/**
 * Explorer page. Where all the main features are: canvas, sidebar
 *
 * Proptypes
 * @param {string} userId id of current logged in user
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
            removeClass: '', //Prompts Vis to remove a class
            currentCollectionName: null, //The collection to load in Vis
            collectionsArray: [], //array of collection names for the user
            loaded: false,
        }
    }

    //this function is passed as a prop to the search bar on Sidebar
    //upon recieving input, makes cal to API to recieve class data
    //passes class data down to canvas

    handleSearch = async (inputText) => {
        this.setState({
            currentlyViewedClass: inputText,
        });
    }

    setCourseObject = (input) => {
        get("/api/sidebarNode", { subject_id: input }).then((courseArray) => {
            console.log("courseArray", courseArray);
            if (courseArray.length === 0) {
                this.setState({
                    courseObject: {
                        found: false,
                        searchedText: input
                    }
                })
            }
            else {
                const courseObjectFromAPI = courseArray[0];
                this.setState({
                    courseObject: {
                        found: true,
                        searchedText: input,
                        prerequisites: courseObjectFromAPI.prerequisites,
                        subject_id: courseObjectFromAPI.subject_id,
                        title: courseObjectFromAPI.title,
                        description: courseObjectFromAPI.description,
                    }, 
                });
            }
        }).catch((err) => {
            console.log("There was an error retrieving a course object for a side bary query. Specific error message:", err.message);
        });
    }


    //returns neighbors for the class and updates state so that network re-renders
    getNeighbors = (inputText) => {
        return get("/api/graphNode", { subject_id: inputText }).then((graphInfo) => {
            const newClassesToAdd = {
                prereqsToAdd: graphInfo[0].prerequisites.map(classId => classId.trim()),
                coreqsToAdd: graphInfo[0].corequisites.map(classId => classId.trim()),
                afterreqsToAdd: graphInfo[0].after_subjects.map(classId => classId.trim()),
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

    handleAddClass = () => {

        //Triggers VisNetwork to add a class
        this.setState({
            newClass: this.state.courseObject.subject_id,
        });

    }

    handleRemoveClass = () => {

        //Triggers VisNetwork to remove a class

    }

    handleLoadCollection = () => {

        //Triggers VisNetwork loading of a collection

    }

    setToNoCollections = () => {
        this.setState( {
            isDisplayCollections: false,
        });
    }

    handleSaveCollection = () => {
        // Activates the pop-up to save collection
        this.setState({
            saveCanvasCounter: this.state.saveCanvasCounter+1,
        });
    }

    handleUserCollections = () => {

        //  Activates display of SideBar with collection options
        // Will require an API request for all of the collection names
        
        // 1/16: setState is async
        // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

        this.setState( {isDisplayCollections: true} );
        get("/api/collectionNames").then((collectionsArrayFromAPI) => {
            this.setState( {collectionsArray: collectionsArrayFromAPI} );
        }).catch((err) => {
            console.log("There was an error retrieving collections for the user. Specific error message:", err.message);
        });
    }


    handleResetCanvas = () => {
        this.setState({
            canvasToBeReset: this.state.canvasToBeReset+1,
            newClass: '',
        });
    }

    setToLoaded = () => {
        this.setState({
            loaded: true,
        });
    }
    // componentDidMount() {}

    render() {
        return (
            <div className="Explorer-all">
                <CanvasOptions 
                    handleSaveCollection={this.handleSaveCollection}
                    handleUserCollections={this.handleUserCollections}
                    resetCanvas={this.handleResetCanvas}
                />
                <div className="Explorer-container">
                    <div className="Explorer-canvas">
                        <Canvas
                            newClass={this.state.newClass}
                            getNeighbors={this.getNeighbors}
                            removeClass={this.state.removeClass}
                            canvasToBeReset={this.state.canvasToBeReset}
                            saveCanvasCounter={this.state.saveCanvasCounter}
                            loadCollectionCounter={this.state.loadCollectionCounter}
                            setCourseObject={this.setCourseObject}
                            getLoadCollectionInfo={this.getLoadCollectionInfo}
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