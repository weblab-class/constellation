import React, { Component } from "react";
import { get } from "../../utilities";

import "./CollectionsList.css";
 
/**
 * Where most of the user inputs are found - searchbar, displaybar, tagbar, etc. 
 *
 * Proptypes
 * @param {Array} collectionsArray contains names of all collections the user has saved
 *
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
        let htmlToDisplay = [];
        for(const collectionName of this.props.collectionsArray) {
            htmlToDisplay.push(collectionName);
        }
        return(
            <>
            <div className="CollectionsList-list">
                {htmlToDisplay.length === 0 ? <p className="CollectionsList-noElements">No Collections Saved</p> : htmlToDisplay.map((row, i) => {
                    return <button className="CollectionsList-listElement" key={row} onClick={this.handleButtonClick}>{row}</button>
                })}
            </div>
            </>
        )
    }

}

export default CollectionsList;