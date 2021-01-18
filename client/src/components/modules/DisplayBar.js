import React, { Component } from "react";
import CourseInfo from "./CourseInfo.js";
import CollectionsList from "./CollectionsList.js";
import { get } from "../../utilities";

import "./DisplayBar.css";

/**
 * displays information for a course which is searched/selected. Contains automatic scroll feature
 *
 * Proptypes
 * @param {CourseObject} courseObject takes in the object containing information for the course searched/selected and renders as HTML
 *
 */

class DisplayBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reset: false,
        }
    }

    //componentDidMount(){}
    handleCancel = () => {
        if(!this.props.isDisplayCollections) {
            return;
        }
        this.props.setToNoCollections();
    }

    componentDidUpdate(prevProps) {
        //if canvasToBeReset isn't previous canvasToBeReset, update
        if(this.props.canvasToBeReset !== prevProps.canvasToBeReset) {
            this.setState({
                reset: true
            })
        }
        else if(this.props.courseObject !== prevProps.courseObject) {
            this.setState({
                reset: false
            })
        }
    }
    
    render() {
        let toDisplay;
        let addRemoveActive = false;
        console.log(this.state.reset);
        if(this.props.isDisplayCollections) {
            toDisplay=<CollectionsList collectionsArray={this.props.collectionsArray} setToLoaded={this.props.setToLoaded}/>
        } else if(!this.props.courseObject || this.state.reset) {
            toDisplay=<p>no class selected...</p>;
        }
        else if(!this.props.courseObject.found) {
            toDisplay=<p className="DisplayBar-notFound">Subject with ID '{this.props.courseObject.searchedText}' not found...</p>;
        }
        else {
            addRemoveActive = true;
            toDisplay=<CourseInfo courseObject={this.props.courseObject}/>;
        }
        return (
            <>
                <div className="DisplayBar-containerOuter">
                    <div className="DisplayBar-containerInner">
                        {toDisplay}
                    </div>
                </div>
                <div className="DisplayBar-buttonContainer">
                    {this.props.isDisplayCollections ? (
                        <>
                        <button className="DisplayBar-button" disabled={!this.props.loaded}> Load </button>
                        <button 
                            className="DisplayBar-button" 
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                        </>
                    ) : (
                        <>
                        <button className="DisplayBar-button" disabled={!addRemoveActive} onClick={this.props.handleAddClass}> Add </button>
                        <button 
                            className="DisplayBar-button" 
                            disabled={!addRemoveActive}
                        >
                            Remove
                        </button>
                        </>
                    )
                    }

                </div>
            </>
        )
    }
}

export default DisplayBar;