import React, { Component } from "react";
import { WiStars } from "react-icons/wi";

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
        //console.log(clicked.target.id);
        const buttonName = clicked.target.id;
        this.props.updateCollectionName(buttonName);
    }

    render(){
        return(
            <>
            <div className="CollectionsList-list">
                {this.props.collectionsArray.length === 0 ? <p className="CollectionsList-noElements">No Constellations Saved</p> : this.props.collectionsArray.map((row) => {
                    return <button className="CollectionsList-listElement" key={row} id={row} onClick={this.handleButtonClick}><WiStars size={35}/>&nbsp;&nbsp;{row}</button>
                })}
            </div>
            </>
        )
    }

}

export default CollectionsList;