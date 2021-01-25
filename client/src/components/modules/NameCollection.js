//NEEDS TO BE RE-STYLED

//post MVP function: for user input for collection name

import React, { Component } from "react";
import { listenerCount } from "../../../../server/models/user.js";
import { get } from "../../utilities.js";
import "./NameCollection.css";
/**
 * Pop-up to take in new collection name.
 * 
 * Proptypes
 * @param {String} currentCollectionName of the Canvas that is loaded.
 * @param {Number} newCollectionNameCounter triggers componentDidUpdate if requesting a new name is needed.
 * @param {Boolean} isSaved whether unsaved changes exist.
 * @param {(String) => ()} setCollectionName callback function for setting Current Collection Name.
 * @param {() => ()} tellVisNetworkToExport callback function to Explorer, which calls Vis
 */

class NameCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            getNewCollectionName: false, //boolean that indicates whether or not to render the "get new name" box.
            placeholderText: "Enter collection name.",
            placeholderType: "NameCollection-input",
            savedText: "(unsaved)"
        }
    }

    handleKeyDown = (event) => {

        // 1/22: https://stackoverflow.com/questions/43384039/how-to-get-input-textfield-values-when-enter-key-is-pressed-in-react-js
        if (event.keyCode === 13) { //checks if Enter key was pressed.
            console.log("The enter key was pressed!");
            this.setState({
                inputText: event.target.value
            }, () => {
                this.localHandleNameSubmission(this.state.inputText);
            });
        }
    }

    handleChange = (event) => {

        this.setState({
            inputText: event.target.value,
        });

    }

    validName = async (inputText) => {

        const isValidName = await get("/api/collectionNames").then(
            (currentNameObject) => {
                // User was not found by the backend.
                if (currentNameObject.length === 0) {
                    return true;
                }

                //Otherwise, a user was found.
                const currentNames = currentNameObject[0].names
                return !currentNames.includes(inputText);
            }
        ).catch(
            (err) => {
                console.log("There was an error in checking if name of new collection exists in database.");
                console.log(err)
            }
        )
        return isValidName;
    }

    localHandleNameSubmission = async (inputText) => {

        const isValidName = await this.validName(inputText.trim())
        console.log(isValidName);

        if (!isValidName) {

            //Reject the name and notify user.
            this.setState({
                inputText: "",
                placeholderText: "Name taken already, enter an unused name.",
                placeholderType: "NameCollection-input change",
            });
        }
        else { //Successfully got name

            //Stop rendering input box.
            this.setState({
                getNewCollectionName: false
            });

            //Tells explorer that collection namem is present and ready for export
            //TODO: Make this more async if needed?
            this.props.setCollectionName(inputText);
            this.props.tellVisNetworkToExport(); //See function in Explorer.
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.newCollectionNameCounter !== this.props.newCollectionNameCounter) {
            this.setState({
                getNewCollectionName: true,
                inputText: "",
                placeholderText: "Enter constellation name. (Limit 20 chars)",
                placeholderType: "NameCollection-input",
            });
        }

        if (prevProps.isSavedCounter !== this.props.isSavedCounter) {
            this.setState({
                savedText: (this.props.isSaved ? "(saved)" : "(unsaved)")
            });
        }
    }

    render() {

        if (this.state.getNewCollectionName) {

            return (<input
                type="text"
                value={this.state.inputText}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder={this.state.placeholderText}
                maxLength="20"
                className={this.state.placeholderType}
            />);
        }
        else {
            //If the collection doesn't have a name yet, notify
            // TODO : Add saved changes or not.
            const currentName = this.props.currentCollectionName ? this.props.currentCollectionName : "unnamed (click save to name)";
            const namedClass = this.props.currentCollectionName ? "NameCollection-named" : "NameCollection-unnamed";
            return (
                <>
                <div className="NameCollection-nameVersion">
                    <span className={namedClass}>
                        {currentName + " "}
                    </span>
                    <span className="NameCollection-saved">
                        {this.state.savedText}
                    </span>
                </div>
                </>
            );
        }
    }
}

export default NameCollection;

//todo add props from explorer --> canvas options & canvas options --> name collectios
