import React, { Component } from "react";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css'; //https://www.npmjs.com/package/rc-checkbox
import "./Options.css";

/**
 *
 * Proptypes
 *
 */

let inputArray = [];
for (let i = 0; i < 25; i++) {
    inputArray.push(Math.random() < 0.5);
}

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }

    onChange = (event) => {
        inputId = event.target.id.split('-')[0];
        this.props.toggleFilterValue(inputId.toString());
    }
    //componentDidMount(){}

    render() {
        let optionsToCheckArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            const checkbox = inputArray[i] ? (
                <input
                    id={i + "-option"}
                    defaultChecked
                    type="checkbox"
                    onChange={this.onChange}
                />
            ) : (
                <input
                    id={i + "-option"}
                    type="checkbox"
                    onChange={this.onChange}
                />
            );
            optionsToCheckArray.push(
                    <div key={i}>
                    <label className="Options-label">
                        {checkbox} 
                        &nbsp; asdfasdf
                    </label>
                    {(i < inputArray.length-1) && <hr className="Options-line"/>}
                    </div>
            );
        }
        return (
            <>
                <h3 className="Options-title"> Current Network Options </h3>
                <hr />
                <div className="Options-container">
                    {optionsToCheckArray}
                </div>
            </>
        );
    }
}

export default Options;