//NEEDS TO BE RE-STYLED

//post MVP function: for user input for collection name

import React, { Component } from "react";
import { get } from "../../utilities.js"

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
            getNewCollectionName : false, //boolean that indicates whether or not to render the "get new name" box.
            placeholderText: "Enter collection name.",
            savedText : "(unsaved)"
        }
    }

    handleKeyDown = (event) => {

        // 1/22: https://stackoverflow.com/questions/43384039/how-to-get-input-textfield-values-when-enter-key-is-pressed-in-react-js
        if (event.keyCode === 13) { //checks if Enter key was pressed.
            console.log("The enter key was pressed!");
            this.setState({
                inputText : event.target.value
            }, () => {
                this.localHandleNameSubmission(this.state.inputText);
            });
        } 
    }

    handleChange = (event) => {

        this.setState({
            inputText : event.target.value,
        });
        
    }

    validName = async (inputText) => {

        const isValidName = await get("/api/collectionNames").then(
            (currentNames) => {
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

        const isValidName = await this.validName(inputText)

        if (!isValidName){

            console.log("Bad invalid name branch");

            //Reject the name and notify user.
            this.setState({
                inputText : "",
                placeholderText: "Please enter unused name.",
            });
        }
        else { //Successfully got name

            //Stop rendering input box.
            this.setState({
                getNewCollectionName : false
            });

             //Tells explorer that collection namem is present and ready for export
             //TODO: Make this more async if needed?
            this.props.setCollectionName(inputText);
            this.props.tellVisNetworkToExport(); //See function in Explorer.
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.newCollectionNameCounter !== this.props.newCollectionNameCounter){
            this.setState({
                getNewCollectionName: true,
                inputText : "",
                placeholderText : "Enter collection name."
            });
        }

        if(prevProps.isSavedCounter !== this.props.isSavedCounter){
            this.setState({
                saveText : (this.props.isSaved ? "(saved)" : "(unsaved)")
            });
            console.log("saved counter is incrementing detect in name collection")
        }
    }

    render() {

        if(this.state.getNewCollectionName){
            //TODO: Make the re-prompting text red! 
            return (<input 
                            type = "text" 
                            value = {this.state.inputText} 
                            onChange = {this.handleChange} 
                            onKeyDown = {this.handleKeyDown}
                            placeholder = {this.state.placeholderText}
                            />);
        }
        else{
            //If the collection doesn't have a name yet, notify
            // TODO : Add saved changes or not.
            const currentName = this.props.currentCollectionName ? this.props.currentCollectionName : "Collection unnamed";
            return (
            <div className="NameCollection-nameVersion">
                {currentName + " " + this.state.savedText }
                </div>
                );
        }
    }
}

export default NameCollection;

//todo add props from explorer --> canvas options & canvas options --> name collectios
