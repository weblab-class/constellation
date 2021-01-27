import React, { Component } from "react";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css'; //https://www.npmjs.com/package/rc-checkbox
import "./Options.css";

/**
 *
 * Proptypes
 *
 */

const FILTER_LIST = ['suggestion','&T','1','2','3','4','5','6','7','8','9','10','11','12','14','15','16','17','18','20','21','21A','21H','21G','21L','21M','21W','22','24','AS','CC','CMS','CSB','EC','EM','ES','HST','IDS','MAS','MS','NS','SCM','SP','STS','WGS']

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }

    onChange = (event) => {
        inputId = event.target.id.split('-')[0];
        console.log('inputId', inputId);
        this.props.toggleFilterValue(inputId.toString());
    }
    //componentDidMount(){}

    render() {
        const inputObject = this.props.filterObject;
        console.log(this.props.filterObject);
        let optionsToCheckArray = [];
        for (const [index, [key, value]] of Object.entries((Object.entries(inputObject)))) {
            const checkbox = value ? (
                <input
                    id={key + "-option"}
                    defaultChecked
                    type="checkbox"
                    onChange={this.onChange}
                />
            ) : (
                <input
                    id={key + "-option"}
                    type="checkbox"
                    onChange={this.onChange}
                />
            );
            optionsToCheckArray.push(
                    <div key={key}>
                    <label className="Options-label">
                        {checkbox} 
                        &nbsp; {key}
                    </label>
                    {(index < Object.keys(inputObject).length-1) && <hr className="Options-line"/>}
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