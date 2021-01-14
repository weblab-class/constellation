import React, { Component } from "react";
import VisNetwork from "../network/NetworkTest";

import { get } from "../../utilities";

import "./Canvas.css";
 
class Canvas extends Component {
    constructor(props){
        super(props);
        this.divRef=React.createRef();
        this.state={
            width: '400px',
            height: '300px',
        }
    }

    render(){
        return(
            <div className="Canvas-container" ref={this.divRef}>
                    <VisNetwork width={this.state.height} height={this.state.height}/>
                    <button onClick={ () => {
                        this.setState({
                            height: this.divRef.current.clientHeight,
                            width: this.divRef.current.clientWidth,
                        });
                    }} />
            </div>
        )
    }
}

export default Canvas;

