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
    console.log(this.getCurrentNetworkData());
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

   getNodeData = () => {
<<<<<<< HEAD
=======

>>>>>>> 3cc29554011b31ba1eaf90d3df2c5d466f7f0146
    let nodeData = [];
    const nodePositions = this.network.getPositions();
    Object.keys(nodePositions).forEach((classId) => {
      nodeData.push({
        x: nodePositions[classId].x,
        y: nodePositions[classId].y,
        id: classId,
        opacity: this.isSuggestionDict[classId] ? 0.5 : 1,
      });
     });
    return nodeData;
<<<<<<< HEAD
   }

   getEdgeData = () => {
=======

   }

   getEdgeData = () => {

>>>>>>> 3cc29554011b31ba1eaf90d3df2c5d466f7f0146
    let edgeData = [];
    this.edgeIds.forEach((edgeId) => {
      const endpoints = edgeId.split('@');
      edgeData.push({
        from: endpoints[0],
        to: endpoints[1],
      });
    });
    return edgeData;
<<<<<<< HEAD
=======

>>>>>>> 3cc29554011b31ba1eaf90d3df2c5d466f7f0146
   }

   //returns array that will be stored in database 
   getCurrentNetworkData = () => {
     const currentNodeData = this.getNodeData();
     const currentEdgeData = this.getEdgeData();
     const currentNetworkData = {
       nodes: currentNodeData,
       edges: currentEdgeData,
     }
     return currentNetworkData;
   }

  //reconstructs Node data from imported array
   parseForNodeData = (nodeArray) => {
    let nodes = [];
    nodeArray.forEach((node) => {
      nodes.push({
        id: node.id,
        label: node.id,
        x: node.x,
        y: node.y,
        opacity: node.opacity,
      });
    });
    return new DataSet(nodes);
   }
  //reconstructs Edge data from imported array
   parseForEdgeData = (edgeArray) => {
    let edges = [];
    edgeArray.forEach((edge) => {
      edges.push({
        id: this.getEdgeId(edge.to, edge.from),
        from: edge.from,
        to: edge.to,
      });
    });
    return new DataSet(edges);
   }

   //reconstructs NodeId data from imported array
   parseForNodeIdData = (nodeArray) => {
    let nodeIds = [];
    nodeArray.forEach((node) => {
      nodeIds.push(node.id);
    });
    return nodeIds;
   }

   //reconstructs EdgeId data from imported array
   parseForEdgeIdData = (edgeArray) => {
      let edgeIds = [];
      edgeArray.forEach((edge) => {
        edgeIds.push(edge.id);
      })
      return edgeIds;
   }

   setNetworkToNewData = (newNodes, newEdges, newNodeIds, newEdgeIds) => {
     this.network.setData({
       nodes: newNodes,
       edges: newEdges,
     });
     this.data.nodes = newNodes;
     this.data.edges = newEdges;
     this.nodeIds = newNodeIds;
     this.edgeIds = newEdgeIds;
   }

   setSuggestionDictToNewData = (nodeArray) => {
      //step 1, set everyhing currently in SuggestionDict to false
      Object.keys(this.isSuggestionDict).forEach((classId) => {
         this.isSuggestionDict[classId] = true
        });
      //step 2, set all new nodes from newNetworkData according to their opacity (not suggestion if opacity is 1, suggestion otherwise)
<<<<<<< HEAD
      newNetworkData.forEach( (elem) => {
        //FILL THIS IN LOL
      })
=======
      nodeArray.forEach( (elem) => {
        this.isSuggestionDict[elem.id] = (elem.opacity === 1) ? false : true;
      });
>>>>>>> 3cc29554011b31ba1eaf90d3df2c5d466f7f0146
   }
  
   resetNetwork = () => {
     let newNodes = new DataSet([{ id: 1, label: "Click me to get started!"},]);
     let newEdges = new DataSet();
     this.nodeIds.forEach((classId) => {
       if(classId !== 1) this.isSuggestionDict[classId] = true;
     });
     //must update state as well so state and network work with same object

     this.network.setData({
       nodes: newNodes,
       edges: newEdges,
     });
     this.data.nodes = newNodes,
     this.data.edges = newEdges,
     this.nodeIds = [];
     this.edgeIds = [];
   }

   saveNetwork = () => {
    //handle saveNetwork stuff
    const currentNetworkData = this.getCurrentNetworkData();
    //bundle network into object, and send to explorer via export network
    this.props.exportNetwork(currentNetworkData);
   }

   loadNetwork = async () => {
     //handle loadNetwork stuff
      let newNetworkData = await this.props.importNetwork();

      const nodeArray = newNetworkData.nodeArray;
      const edgeArray = newNetworkData.edgeArray;
      //create data = {nodes: , edges: }, and edgeId's, and suggestionId's
      let newNodes = this.parseForNodeData(nodeArray);
      let newEdges = this.parseForEdgeData(edgeArray);
      let newNodeIds = this.parseForNodeIdData(nodeArray);
      let newEdgeIds = this.parseForEdgeIdData(edgeArray);
      //update isSuggestionDict
      this.setSuggestionDictToNewData(nodeArray);
      this.setNetworkToNewData(newNodes, newEdges, newNodeIds, newEdgeIds);
      //reset all relevant state variables as well
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
    //process removing class
    //if(this.props.removeClass && this.props.removeClass !== prevProps.removeClass) this.processRemoval(this.props.removeClass)
    //if canvasToBeReset isn't previous canvasToBeReset, update
    if(this.props.canvasToBeReset !== prevProps.canvasToBeReset) this.resetNetwork();
<<<<<<< HEAD
    if(this.props.saveCanvasCounter !== prevProps.saveCanvasCounter) this.saveNetwork();
=======
    if(this.props.saveCanvasCounter !== prevProps.saveCanvasCounter){
      this.saveNetwork();
    }
>>>>>>> 3cc29554011b31ba1eaf90d3df2c5d466f7f0146
    if(this.props.loadCollectionCounter !== prevProps.loadCollectionCounter) this.loadNetwork();
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