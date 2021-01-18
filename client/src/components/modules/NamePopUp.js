
//TEMPORARY USE FOR DEVELOPMENT ONLY

import React, { Component } from "react";

class NamePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text" 
                    className="NamePopUp-input" 
                    placeholder={"search for a collection"}
                    value={this.state.inputText}
                />
                <button 
                    type="submit" 
                    className="NamePopUp-button"
                    onClick={this.props.handleNewName()}
                ></button>
            </div>
        )
    }
}

export default NamePopUp;