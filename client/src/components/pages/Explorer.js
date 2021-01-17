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
            newClass: '',
            newClassesToAdd: {
                prereqsToAdd: [],
                coreqsToAdd: [],
                afterreqsToAdd: [],
            },
            canvasToBeReset: false,
            removeClass: '',
<<<<<<< HEAD
            courseObject: undefined,
=======
            isDisplayCollections: false,
>>>>>>> f8ffcc05c1bce24966c2f79f410b014f56cddf42
        }
    }

    //this function is passed as a prop to the search bar on Sidebar
    //upon recieving input, makes cal to API to recieve class data
    //passes class data down to canvas

    handleSearch = async (inputText) => {
        this.setState({
            newClass: inputText,
        });
        const classData = await this.getNeighbors(inputText);
        console.log(classData.prereqsToAdd);
        console.log(classData.coreqsToAdd);
        console.log(classData.afterreqsToAdd);
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
                        description: courseObjectFromAPI.description
                    }
                });
            }
        });
    }

    //returns neighbors for the class and updates state so that network re-renders
    getNeighbors = (inputText) => {
        return get("/api/graphNode", { subject_id: inputText }).then((graphInfo) => {
            const newClassesToAdd = {
                prereqsToAdd: graphInfo[0].prerequisites,
                coreqsToAdd: graphInfo[0].corequisites,
                afterreqsToAdd: graphInfo[0].after_subjects,
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

    getDummyNeighbors = (inputText) => {
        return class6006;
    }

    getCollectionObject = () => {

    }

    handleAddClass = () => {

    }

    handleRemoveClass = () => {

    }

    handleLoadCollection = () => {

    }

    handleCancel = () => {

    }

    handleSaveCollection = () => {

    }

    handleUserCollections = () => {
        
        // 1/16: setState is async
        // https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync

        this.setState( {isDisplayCollections: true} );
        
    }

    getLoadCollectionInfo = () => {

    }

    resetCanvas = () => {
        this.setState({
            canvasToBeReset: true,
        });
    }
    // componentDidMount() {}

    render() {
        return (
            <div className="Explorer-all">
                <CanvasOptions 
                    handleSaveCollection={this.handleSaveCollection}
                    handleUserCollections={this.handleUserCollections}
                    resetCanvas={this.resetCanvas}
                />
                <div className="Explorer-container">
                    <div className="Explorer-canvas">
                        <Canvas
                            newClass={this.state.newClass}
                            getNeighbors={this.getNeighbors}
                            removeClass={this.state.removeClass}
                            canvasToBeReset={this.state.canvasToBeReset}
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
                            handleCancel={this.handleCancel} 
                            canvasToBeReset={this.state.canvasToBeReset}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Explorer;