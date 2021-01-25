import React, { Component } from "react";
import { navigate } from "@reach/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import NameCollection from "./NameCollection.js";

import "./CanvasOptions.css";

/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Function} resetCanvas callback function to clear graph, display bar
 * @param {Function} handleSaveCollection passed to SaveCollection
 * @param {Function} handleUserCollections passed to UserCollection
 * @param {Boolean} isDisplayCollections passed to SaveCollection 
 * @param {Function} handleLogout passed to dropdown

 */

class CanvasOptions extends Component {
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
        });
    }

    closeDropdown = (event) => {
        event.preventDefault();
        this.setState({
            showDropdown: false,
        });
    }

    returnHome = () => {
        navigate("/");
    }

    handleLogoutClick = () => {
        this.props.handleLogout();
        this.returnHome();
    }

    //componentDidMount(){}

    /*
   */



    render() {
        return (
            <>
                <nav className="CanvasOptions-navBar">
                    <div className={this.state.showDropdown ? "CanvasOptions-menuButtonContainerOpen" : "CanvasOptions-menuButtonContainerClosed"}>
                        <button
                            type="submit"
                            onClick={this.returnHome}
                            className="CanvasOptions-menuButton"
                        >
                            home
                        </button>
                        <button
                            type="submit"
                            onClick={this.handleLogoutClick}
                            className="CanvasOptions-menuButton"
                        >
                            logout
                        </button>
                    </div>
                    <div className={this.state.showDropdown ? "CanvasOptions-menuOpen" : "CanvasOptions-menuClosed"}>
                        <button
                            type="submit"
                            onClick={this.state.showDropdown ? this.closeDropdown : this.showDropdown}
                            className="CanvasOptions-icon"
                        >

                            {this.state.showDropdown ? <ImCross size="1.2vw" /> : <GiHamburgerMenu size="1.2vw" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-load"
                        onClick={this.props.handleUserCollections}
                    >
                        load
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-new"
                        onClick={this.props.handleNewCollection}
                        disabled={this.props.isDisplayCollections}
                    >
                        new
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-save"
                        onClick={this.props.handleSaveCollection}
                        disabled={this.props.isDisplayCollections}
                    >
                        save
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-reset"
                        onClick={this.props.resetCanvas}
                        disabled={this.props.isDisplayCollections}
                    >
                        reset
                    </button>
                    <div className="CanvasOptions-verticalLine"></div>
                    <div className="CanvasOptions-name">
                        <NameCollection
                            currentCollectionName={this.props.currentCollectionName}
                            newCollectionNameCounter={this.props.newCollectionNameCounter}
                            isSaved={this.props.isSaved}
                            isSavedCounter={this.props.isSavedCounter}
                            setCollectionName={this.props.setCollectionName}
                            tellVisNetworkToExport={this.props.tellVisNetworkToExport}
                        />
                    </div>

                </nav>
            </>
        );
    }
}

export default CanvasOptions;