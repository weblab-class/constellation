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

 //DUMMY DATA
 const class6006 = {
     prereqsToAdd: ["6.001", "6.042", "18.01", "18.02"],
     coreqsToAdd: [],
     afterreqsToAdd: ["6.046", "6.854", "6.856"],
 }

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

    //returns neighbors for the class and updates state so that network re-renders
    getNeighbors = (inputText) => {
        return get("/api/graphNode", {class_id: inputText}).then((graphInfo) => {
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


    // componentDidMount() {}

    render(){
        return(
            <div className="Explorer-all">
                <CanvasOptions />
                <div className="Explorer-container"> 
                    <div className="Explorer-canvas"> 
                        <Canvas 
                            newClass={this.state.newClass}
                            getNeighbors = {this.getNeighbors}
                        />
                    </div>
                    <div className="Explorer-sideBar"> 
                        <SideBar handleSearch={this.handleSearch}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explorer;