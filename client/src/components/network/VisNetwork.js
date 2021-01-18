import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import React, { Component, createRef } from "react";
import { GiBlackHandShield } from 'react-icons/gi';


// create a network
//  let container = document.getElementById("mynetwork");

/* TODO 
  GROUP for full classes
  GROUP for suggestions
*/

//to check if an edge exists, merely check that both endpoints are added


class VisNetwork extends Component {

  constructor(props) {
    super(props);
    //setup vis.js stuff
    // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
    let shadowState = false;

    // create an array with nodes, and one with edges
    let nodesArray = [{ id: 1, label: "Click me to get started!"},]; //generate the help node for new users
    let nodes = new DataSet(nodesArray);
    let edgesArray = [];
    let edges = new DataSet(edgesArray);

    //1 for added node, 0 for suggestion
    this.isSuggestionDict = {}; //Suggestion or Fully added class
    this.network = {};
    this.data = {
      nodes: nodes,
      edges: edges,
    },
    this.nodeIds = [1],
    this.edgeIds = [],
    this.appRef = createRef();
    this.state={
        prevProcessedClass:'',
        clickToUse: false,
        options: {
          height: '700px',
          width: '1000px',
          nodes: {
             shape: 'dot',
             size: 8,
             borderWidth: 3,
             opacity: 0.3,
          },
        },
    };
  }

  //add all new nodes
  //add all new edges
  //update transparency

  alreadyAddedNode = (classId) => {
    return this.nodeIds.includes(classId);
  }

  alreadyAddedEdge = (edgeId) => {
    return this.edgeIds.includes(edgeId);
  }

  relevanceToCurrentNetwork = (classId) => {
    //look through classes that are FULLY ADDED
    //iterate through classes and check to see which of prereqsare satisfied
    return 0.1;
  }

  //updates suggestion to fully added node
  updateToFull = (classId) => {
    this.isSuggestionDict[classId] = false; //error here
    this.updateNodeOpacity(classId, 1);
  }

  //set Node opacity to val
  updateNodeOpacity = (classId, val) => {
    this.data.nodes.update([{ id: classId, opacity: val }]); 
  }

  //adds class newUpdate to network, adds suggestions to neighbors
  processAddition = async (classId) => {
    if(this.alreadyAddedNode(classId)){
      if(!this.isSuggestionDict[classId]) return;
      else this.updateToFull(classId);
    }
    else this.addNode(classId, false, 1);
    const neighbors = await this.props.getNeighbors(classId);
    neighbors.prereqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 0);
    });
    neighbors.coreqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 1);
    });
    neighbors.afterreqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 2);
    });
    this.setState({
      prevProcessedClass: classId,
    });
  }

  //parameters classId: class which was recently added to network, suggestionId: the current suggestion related to classId, 
  //val: 0 for prereq, 1 for coreq, 2 for after_subject
  processSuggestionAddition = (classId, suggestionId, val) => {
    this.addEdge(classId, suggestionId, val);
    if(!this.alreadyAddedNode(suggestionId)){
      this.addNode(suggestionId,true,this.relevanceToCurrentNetwork(suggestionId));
    } else if(this.isSuggestionDict[classId]){
      this.updateNodeOpacity(suggestionId,this.relevanceToCurrentNetwork(suggestionId));
      console.log("We've already added: " + suggestionId);
    }
  }


  //two parameters: nodeLabel=courseID
  addNode = (classId, suggestionStatus, opacity) => {
    if(this.alreadyAddedNode(classId)) return;
    this.isSuggestionDict[classId]=suggestionStatus;
    this.data.nodes.add({ id: classId, label: classId, opacity: opacity}); //add group
    this.nodeIds.push(classId);
    console.log("Pushing: " + classId);
   }

   //edge id is of the form SMALLER_CLASS@LARGER_CLASS (wrt string order)
   getEdgeId = (classFrom, classTo) => {
     if(classFrom === classTo) return "SAME";
     return (classFrom < classTo) ? (classFrom + '@' + classTo) : (classTo + '@' + classFrom);
   }

   //TODO: add functionality for val
   addEdge = (classFrom, classTo, val) => {
    //check if edge already exists
    const edgeId = this.getEdgeId(classFrom, classTo);
    if(this.alreadyAddedEdge(edgeId)) return;
    this.data.edges.add({
      id: edgeId,
      from: classFrom,
      to: classTo,
    });
    this.edgeIds.push(edgeId);
   }

   processNodeClick = (classId) => {
     this.props.setCourseObject(classId);
   }
   
   changeNode1 = () => {
    let newColor = "#" + Math.floor(Math.random() * 255 * 255 * 255).toString(16);
    this.data.nodes.update([{ id: 1, color: { background: newColor } }]);
   }

   resetNetwork = () => {
     let newNodes = new DataSet([{ id: 1, label: "Click me to get started!"},]);
     let newEdges = new DataSet();
     this.nodeIds.forEach((classId) => {
       if(classId !== 1) this.isSuggestionDict[classId] = true;
     });
     //must update state as well so state and network work with same object
     console.log(newNodes);
     this.network.setData({
       nodes: newNodes,
       edges: newEdges,
     });
     this.data.nodes = newNodes,
     this.data.edges = newEdges,
     this.nodeIds = [];
     this.edgeIds = [];
    //  this.props.stabilizeCanvas(); --> USE COMPONENT DID UPDATE FOR THIS
     //TODO: empty nodeId and edgeId lists as well, and suggestion dict (for suggestion dict, its enough to set all currently existing entries to false)
   }

  componentDidMount() {
    this.network = new Network(this.appRef.current, this.data, this.state.options);
    this.network.on("selectNode", (params) => {
      const nodeId = params.nodes[0];
      this.processNodeClick(nodeId);
    });
  }

  componentDidUpdate(prevProps) {
    //if new class isn't previous class, update
    if(this.props.newClass && this.props.newClass !== prevProps.newClass) this.processAddition(this.props.newClass);
    //if canvasToBeReset isn't previous canvasToBeReset, update
    if(this.props.canvasToBeReset !== prevProps.canvasToBeReset) this.resetNetwork();
  }

  render() {
    return (
        <>
            <div ref={this.appRef} />
        </>
    );
  }
}

export default VisNetwork;