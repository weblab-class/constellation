import React, { Component, createRef } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";

import "./SearchBar.css";

/**
 * Searchbar to search for class
 *
 * Proptypes
 * @param {(String) => ()} setCourseObject callback function that takes in input text and sets current course object
 *
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    glassClick = () =>{
        console.log("The glass was clicked!");
        this.props.handleSearch(this.state.inputText);
        this.props.setCourseObject(this.state.inputText);
        this.state.inputText = '';
    }

    handleChange = (event) => {
        this.setState({
            inputText: event.target.value,
        });
    }

    //componentDidMount(){}

    render() {
        return (
            <div className="SearchBar-container">
                <div className="SearchBar-search">
                    <input 
                        type="text" 
                        className="SearchBar-input" 
                        placeholder={this.props.isDisplayCollections ? "" : "search for a course number!"}
                        value={this.state.inputText} 
                        onChange={this.handleChange} 
                        disabled={this.props.isDisplayCollections}
                    />
                    <button 
                        type="submit" 
                        className="SearchBar-button"
                        disabled={this.props.isDisplayCollections}

                    >
                        <GiMagnifyingGlass size={25} onClick={this.glassClick}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;