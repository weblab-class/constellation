import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { get } from "../../utilities";

import "./SearchBar.css";

/**
 * Searchbar to search for class
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 *
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    //componentDidMount(){}

    render() {
        return (
            <div className="SearchBar-container">
                <div className="SearchBar-search">
                    <input type="text" className="SearchBar-input" placeholder="search for any class!" />
                    <button type="submit" className="SearchBar-button">
                        <FontAwesomeIcon icon={}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;