//NEEDS TO BE RE-STYLED

//post MVP function: for user input for collection name

import React, { Component } from "react";

/**
 * Pop-up to take in new collection name.
 * 
 * Proptypes
 * @param {() => ()} handleNewName callback function for prompting pop-up for SaveCanvas on a new canvas.
 */

class NamePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            inputText : event.target.value
        });
    }

    localHandleNewName = () => {
        this.props.handleNewName(this.state.inputText);
    }

    render() {
        return (
            <div>
                <input
                    type="text" 
                    className="NamePopUp-input" 
                    placeholder={"enter collection name"}
                    value={this.state.inputText}
                    onChange={this.handleChange}
                />
                <button 
                    type="submit" 
                    className="NamePopUp-button"
                    onClick={this.localHandleNewName}
                ></button>
            </div>
        )
    }
}

export default NamePopUp;