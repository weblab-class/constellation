import React, { Component } from "react";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css'; //https://www.npmjs.com/package/rc-checkbox
import "./Options.css";

/**
 *
 * Proptypes
 *
 */

function isNumeric(str) { //taken from https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  
const FILTER_LIST = ['suggestion','&T','1','2','3','4','5','6','7','8','9','10','11','12','14','15','16','17','18','20','21','21A','21H','21G','21L','21M','21W','22','24','AS','CC','CMS','CSB','EC','EM','ES','HST','IDS','MAS','MS','NS','SCM','SP','STS','WGS'];
const COURSE_NAMES = [
    'Civil and Environmental Engineering',
    'Mechanical Engineering',
    'Materials Science and Engineering',
    'Architecture',
    'Chemistry',
    'Electrical Engineering and Computer Science',
    'Biology',
    'Physics',
    'Brain and Cognitive Sciences',
    'Civil and Environmental Engineering',
    'Chemical Engineering',
    'Urban Studies and Planning',
    'Economics',
    'Management',
    'Aeronautics and Astronautics',
    'Political Science',
    'Mathematics',
    'Biological Engineering',
    'Humanities',
    'Anthropology',
    'History',
    'Global Languages',
    'Literature',
    'Music and Theater Arts',
    'Writing',
    'Nuclear Science and Engineering',
    'Linguistics and Philosophy',
    'Aerospace Studies',
    'Concourse',
    'Comparative Media Studies',
    'Computational and Systems Biology',
    'Edgerton Center',
    'Engineering Management',
    'Experimental Study Group',
    'Health Sciences and Technology',
    'Data, Systems, and Society',
    'Media Arts and Sciences',
    'Military Science',
    'Naval Science',
    'Supply Chain Management',
    'Special Programs',
    'Science, Technology, and Society',
    'Women\'s and Gender Studies',
];

const MESSAGES = [];

MESSAGES.push("Show Suggested Nodes");
MESSAGES.push("Show tutorial");
for(let i=2; i<FILTER_LIST.length; i++) {
    const addon = isNumeric(FILTER_LIST[i]) ? 'Course' : '';
    MESSAGES.push(`Show ${addon} ${FILTER_LIST[i]} (${COURSE_NAMES[i-2]})`);
}

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }

    onChange = (event) => {
        //console.log(event.target.id);
        const inputId = event.target.id.split('-')[0];
        //console.log('inputId', inputId);
        this.props.toggleFilterValue(inputId.toString());
    }
    //componentDidMount(){}

    render() {
        const inputObject = this.props.filterObject;
        console.log(this.props.filterObject);
        let optionsToCheckArray = [];
        for (let i=0; i<FILTER_LIST.length; i++) {
            const key = FILTER_LIST[i];
            const value = inputObject[key];
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
                        &nbsp; {MESSAGES[i]}
                    </label>
                    {(i < Object.keys(inputObject).length-1) && <hr className={i >= 2 ? "Options-dashedLine" : "Options-solidLine"}/>}
                    </div>
            );
        }
        return (
            <>
                <h3 className="Options-title"> Current Network Options </h3>
                <hr className="Options-reallySolidLine"/>
                <div className="Options-container">
                    {optionsToCheckArray}
                </div>
            </>
        );
    }
}

export default Options;