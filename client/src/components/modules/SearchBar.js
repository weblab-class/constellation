import React, { Component, createRef } from "react";
import { GoTelescope } from "react-icons/go";
import Autosuggest from "react-autosuggest"; //autosuggest code taken from https://github.com/moroshko/react-autosuggest
import { get } from "../../utilities.js";
import "./SearchBar.css";

/**
 * Searchbar to search for class
 *
 * Proptypes
 * @param {Function} setCourseObject callback function that takes in input text and sets current course object
 * @param {Boolean} isDisplayCollections true if collections should be displayed 
 */

let subjectIdArray;

get("/api/subjectIds").then((subjectIdObject) => {
    subjectIdArray = subjectIdObject.subjectId;
}).catch((err) => {
    //console.log("there was an error retrieving array of subject IDs. specific error message:", err.message);
});

//code taken from https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.toLowerCase();
    const regex = new RegExp("\\b" + escapeRegExp(inputValue));
    //console.log("inputValue: ", inputValue);
    const inputLength = inputValue.trim().length;

    return inputLength === 0 ? [] : subjectIdArray.filter(subject => {
        return subject.toLowerCase().match(regex);
    }).slice(0, 200);
};

const getSuggestionValue = suggestion => {
    //console.log("suggestion value:", suggestion);
    return suggestion;
}

//highlighting suggestion code modified from https://codepen.io/moroshko/pen/PZWbzK
let match = require('autosuggest-highlight/match');
let parse = require('autosuggest-highlight/parse');
function renderSuggestion(suggestion, { query }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);
    return (
        <span className="SearchBar-suggestionText">
            {
                parts.map((part, index) => {
                    const className = part.highlight ? 'highlight' : null;
                    return (
                        <span className={className} key={index}>{part.text}</span>
                    );
                })
            }
        </span>
    );
};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            suggestions: []
        }
    }


    glassClick = () => {
        //console.log("SearchBar 24: The glass was clicked!");
        this.props.setCourseObject(this.state.inputText);
        this.setState({
            inputText: '',
        });
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.props.setCourseObject(this.state.inputText);
            this.setState({
                inputText: '',
            });
        }
    }

    onChange = (event, { newValue, method }) => {
        //console.log("onChange newValue:", newValue);
        this.setState({
            inputText: newValue,
        });
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        //console.log(value);
        this.setState({
            suggestions: getSuggestions(value)
        })
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    };

    //componentDidMount(){}

    render() {
        const inputProps = {
            type: "text",
            className: "SearchBar-input",
            placeholder: this.props.isDisplayCollections ? "" : "search for a course number or topic!",
            value: this.state.inputText,
            onChange: this.onChange,
            onKeyDown: this.handleKeyDown,
            disabled: this.props.isDisplayCollections || this.props.optionsAreDisplayed,
        };

        return (
            <div className="SearchBar-container">
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />

                <button
                    type="submit"
                    className="SearchBar-button"
                    disabled={this.props.isDisplayCollections||this.props.optionsAreDisplayed}
                    onClick={this.glassClick}
                >
                    <GoTelescope size="3vh" />
                </button>
            </div>
        );
    }
}

export default SearchBar;