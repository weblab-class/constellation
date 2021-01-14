import React, { Component } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";

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
                        <GiMagnifyingGlass size={25}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;