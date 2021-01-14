import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import React, { Component, createRef } from "react";


// initialize your network!

// const nodes = new DataSet([
//     { id: 1, label: 'Node 1' },
//     { id: 2, label: 'Node 2' },
//     { id: 3, label: 'Node 3' },
//     { id: 4, label: 'Node 4' },
//     { id: 5, label: 'Node 5' }
//   ]);
  
//   // create an array with edges
//   const edges = new DataSet([
//     { from: 1, to: 3 },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 }
//   ]);
  
//   const data = {
//     nodes: nodes,
//     edges: edges
//   };
  
//   const options = {
//       autoResize: true,
//       height: '800px',
//       width: '400px',
//   };

 // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
 let nodeIds = [2, 3, 4, 5];
 let shadowState = false;

 // create an array with nodes
 let nodesArray = [
   { id: 1, label: "Node 1" },
   { id: 2, label: "Node 2" },
   { id: 3, label: "Node 3" },
   { id: 4, label: "Node 4" },
   { id: 5, label: "Node 5" },
 ];
 let nodes = new DataSet(nodesArray);

 // create an array with edges
 let edgesArray = [
   { from: 1, to: 3 },
   { from: 1, to: 2 },
   { from: 2, to: 4 },
   { from: 2, to: 5 },
 ];
 let edges = new DataSet(edgesArray);

 // create a network
//  let container = document.getElementById("mynetwork");
 let data = {
   nodes: nodes,
   edges: edges,
 };

 let options = {
     height: '700px',
     width: '1000px',
 };





class VisNetwork extends Component {

  constructor(props) {
    super(props);
    this.network = {};
    this.appRef = createRef();
    this.state={
        data: {
            nodes: nodes,
            edges: edges,
        },
        nodeIds: nodeIds,
        options: {
            autoResize: true,
            height: this.props.width,
            width: this.props.height,
        },
    };
  }

  addNode = () => {
    let newId = (Math.random() * 1e7).toString(32);
    this.state.data.nodes.add({ id: newId, label: "I'm new!" });
    this.state.nodeIds.push(newId);
   }
   
   changeNode1 = () => {
    let newColor = "#" + Math.floor(Math.random() * 255 * 255 * 255).toString(16);
    nodes.update([{ id: 1, color: { background: newColor } }]);
   }

  componentDidMount() {
    this.network = new Network(this.appRef.current, data, options);
  }

  render() {
    return (
        <>
            <div ref={this.appRef} />
            <button onClick={this.addNode}> ADD A NODE </button>
        </>
    );
  }
}

export default VisNetwork;