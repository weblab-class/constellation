import React, { Component } from "react";

import { slide as dropdown } from "react-burger-menu";

import { get } from "../../utilities";

import "./Dropdown.css";

/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} handleSaveCollection saves current collection, prompts user to name if not saved before
 * @param {Boolean} isDisplayCollections true if collections should be displayed 
 * @param {Function} handleLogout logs user out
 */

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
        };

    }

    showDropdown = (event) => {
        event.preventDefault();
        this.setState({
            showDropdown: true,
        }, () => {
            document.addEventListener('click', this.closeDropdown);
        });
    }

    closeDropdown = (event) => {
        event.preventDefault();
        this.setState({
            showDropdown: false,
        }, () => {
            document.removeEventListener('click', this.closeDropdown);
        });
    }

    returnHome = () => {
        navigate("/");
    }

    handleLogoutClick = () => {
        this.props.handleLogout();
        this.returnHome();
    }

    render() {
        return (
            <>
                <button onClick={this.showDropdown} className="Dropdown-gridDropdown"> <GiHamburgerMenu size={25} /> </button>
                {
                    this.state.showDropdown ? (
                        <>
                            <button onClick={this.returnHome} className="Dropdown-gridHome">home</button>
                            <button onClick={this.handleLogoutClick} className="Dropdown-gridLogout">logout</button>
                        </>
                    ) : (
                            null
                        )
                }
            </>
        )
    }
}

export default Dropdown;