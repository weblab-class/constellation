import React, { Component } from "react";
import CourseInfo from "./CourseInfo.js";
import CollectionsList from "./CollectionsList.js";
import { get } from "../../utilities";

import "./DisplayBar.css";

/**
 * displays information for a course which is searched/selected. Contains automatic scroll feature
 *
 * Proptypes
 * @param {Boolean} isDisplayCollections true if collections should be displayed 
 * @param {Function} handleAddClass adds class to network when 'add' is clicked
 * @param {Function} handleRemoveClass removes class from network when 'remove' is clicked
 * @param {Function} handleLoadCollection loads collection name when 'load' is clicked
 * @param {Function} handleCancel checks that collections are displayed when called, then calls setToNoCollections
 * @param {Boolean} canvasToBeReset true if graph + display bar should be cleared
 * @param {Function} setToNoCollections reverts page to state before 'my collections' was clicked
 * @param {Boolean} loaded true if a collection is loaded
 * @param {Array} collectionsArray passed to CollectionsList
 * @param {Function} setToLoaded passed to CollectionsList
 * @param {Object} courseObject passed to CourseInfo
 */

class DisplayBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reset: false,
            collectionName: undefined,
        }
    }

    //componentDidMount(){}
    handleCancel = () => {
        if(!this.props.isDisplayCollections) {
            return;
        }
        this.props.setToNoCollections();
    }

    componentDidUpdate = (prevProps) => {
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
    
    updateCollectionName = (name) => {
        this.setState({
            collectionName: name,
        });
    }

    handleLoadButtonClick = () => {
        console.log(this.state.collectionName);
        this.props.handleLoadCollection(this.state.collectionName);
    }

    render() {
        let toDisplay;
        let addRemoveActive = false;
        console.log(this.state.reset);
        if(this.props.isDisplayCollections) {
            toDisplay=
            <CollectionsList 
                collectionsArray={this.props.collectionsArray} 
                setToLoaded={this.props.setToLoaded}
                updateCollectionName={this.updateCollectionName}
            />
        } else if(!this.props.courseObject || this.state.reset) {
            toDisplay=<p>no class selected...</p>;
        }
        else if(!this.props.courseObject.found) {
            toDisplay=<p className="DisplayBar-notFound">Subject with ID ' {this.props.courseObject.searchedText} ' not found...</p>;
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
                        <button 
                            className="DisplayBar-button" 
                            disabled={!this.props.loaded}
                            onClick={this.handleLoadButtonClick}
                        >
                            Load 
                        </button>
                        <button 
                            className="DisplayBar-button" 
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                        </>
                    ) : (
                        <>
                        <button 
                            className="DisplayBar-button" 
                            disabled={!addRemoveActive} 
                            onClick={this.props.handleAddClass}
                        > 
                            Add 
                        </button>
                        <button 
                            className="DisplayBar-button" 
                            disabled={!addRemoveActive}
                            onClick={this.props.handleRemoveClass}
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