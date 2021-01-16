import React, { Component } from "react";
import Canvas from "../modules/Canvas.js";
import SideBar from "../modules/SideBar.js";

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

 const class6007 = {
    prereqsToAdd: ["6.002", "6.043", "18.03", "18.04"],
    coreqsToAdd: [],
    afterreqsToAdd:  ["6.049", "6.857", "6.851"],
}

const class6008 = {
    prereqsToAdd: ["6.004", "6.045", "18.06", "18.07"],
    coreqsToAdd: [],
    afterreqsToAdd: ["6.041", "6.852", "6.853"],
}

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUpdate: '',
        }
    }

    //this function is passed as a prop to the search bar on Sidebar
    //upon recieving input, makes cal to API to recieve class data
    //passes class data down to canvas


    handleSearch = (inputText) => {
        this.setState({
            newUpdate: inputText,
        });
        console.log("Testing handleSearch!" + inputText);
        // return this.getNeighbors(inputText);
    }

    //returns neighbors for the class with subject_id inputText
    getNeighbors = (inputText) => {
        get("api/graphNode", {subject_id: inputText}).then((graphInfo) => {
          const prereqsToAdd = graphInfo.prerequisites;
          const coreqsToAdd = graphInfo.coreqs;
          const afterreqsToAdd = graphInfo.after_subjects;
        }).catch((err) => {
          console.log("Oops, there was an error trying to recieve classes!");
        });
        const neighbors = {
          prereqsToAdd: prereqsToAdd,
          coreqsToAdd: coreqsToAdd,
          afterreqsToAdd: afterreqsToAdd,
        };
        return neighbors;
      }

      getDummyNeighbors = (inputText) => {
          return class6006;
      }


    // componentDidMount() {}

    render(){
        return(
            <div className="Explorer-all">
                <div className="Explorer-container"> 
                    <div className="Explorer-canvas"> 
                        <Canvas 
                            newUpdate={this.state.newUpdate}
                            getNeighbors = {this.getDummyNeighbors}
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