import React, { Component } from "react";
import { navigate } from "@reach/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import NameCollection from "./NameCollection.js";
import _ from "lodash"; //debounce function
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
 * @param {String} currentCollectionName passed to NameCollection
 * @param {Number} newCollectionNameCounter passed to NameCollection, tracks whether need to request user input for name
 * @param {Number} switchedCollectionCounter passed to NameCollection, tracks if load or new were pressed during a user input
 * @param {Boolean} isSaved passed to NameCollection, whether unsaved changes made or saved changes loaded
 * @param {Number} isSavedCounter passed to NameCollection, helps trigger checking of above state
 * @param {Function} setCollectionName callback function, passed to NameCollection
 * @param {Function} tellVisNetworkToExport callback function, passed to NameCollection
 * @param {Function} handleNewCollection used in new button
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
                        <button
                            type="submit"
                            className="CanvasOptions-menuButton"
                            onClick={this.props.displayOptions}
                        >
                            filters
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
                        onClick={_.debounce(this.props.handleUserCollections, 1000)}
                        disabled={this.props.optionsAreDisplayed}
                    >
                        load
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-new"
                        onClick={_.debounce(this.props.handleNewCollection, 1000)}
                        disabled={this.props.isDisplayCollections||this.props.optionsAreDisplayed}
                    >
                        new
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-save"
                        onClick={_.debounce(this.props.handleSaveCollection, 1000)}
                        disabled={this.props.isDisplayCollections}
                    >
                        save
                    </button>

                    <button
                        type="submit"
                        className="CanvasOptions-button CanvasOptions-reset"
                        onClick={_.debounce(this.props.resetCanvas, 1000)}
                        disabled={this.props.isDisplayCollections||this.props.optionsAreDisplayed}
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
                            switchedCollectionCounter={this.props.switchedCollectionCounter}
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