import React, { Component } from "react";
import { get } from "../../utilities";

import "./CollectionsList.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Array} collectionsArray contains names of all collections the user has saved
 * @param {Function} setToLoaded sets loaded to true
 */

class CollectionsList extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    handleButtonClick = (clicked) => {
        this.props.setToLoaded();
        const buttonName = clicked.target.innerHTML;
        this.props.updateCollectionName(buttonName);
    }

    render(){
        return(
            <>
            <div className="CollectionsList-list">
                {this.props.collectionsArray.length === 0 ? <p className="CollectionsList-noElements">No Constellations Saved</p> : this.props.collectionsArray.map((row, i) => {
                    return <button className="CollectionsList-listElement" key={row} onClick={this.handleButtonClick}>{row}</button>
                })}
            </div>
            </>
        )
    }

}

export default CollectionsList;