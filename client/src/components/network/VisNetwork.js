import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import React, { Component, createRef } from "react";
import { GiBlackHandShield } from 'react-icons/gi';

import "./VisNetwork.css";

/* TODO 
  //setAdjacencyCount to new data
  //fix skeleton edges upon removing class (see doc)
  //add parameters
*/

//to check if an edge exists, merely check that both endpoints are added

//colors, courtesy of https://wondernote.org/color-palettes-for-web-digital-blog-graphic-design-with-hexadecimal-codes/

/*sample group options
  "courseNumber": {
    color: "#00C3AF",
    borderWidth: 3,
  },
*/


const SUGGESTED_EDGE_OPACITY = 0.2;
const SUGGESTED_NODE_OPACITY = 0.2;
const CLUTTER_COURSES = ['ES', 'CC', "HST"];

const SUMMER_COLORS = {
  "1" :"#53CFDA",
  "2":"#FF8860",
  "3":"#FF3747", 
  "4":"#FF458F",
  "5":"#ECF7DD",
  "6":"#F7D635",
  "7":"#FF8BOF",
  "8":"#FF8352",
  "9":"#4FCBBB",
  "10":"#FF7994",
  "11":"#D6E8D9",
  "12":"#FFD600",
  "14":"#DEE500",
  "15":"#2494CC",
  "15":"#FFC900",
  "16":"#FlC9C2",
  "17":"#EAE45F",
  "18":"#OOEIDF",
  "20":"#FFEDOO",
  "21":"#DDF5C2",
  "22":"#00C3AF",
}

const TUTORIAL_LABELS = {
  '&T.START': 'Click me to start!',
  '&T.GRAPH': 'How to View',
  '&T.ADD': 'Adding classes',
  '&T.REMOVE': 'Removing classes',
  '&T.FILE': 'Files',
  '&T.RESET': 'Resetting',
  '&T.NEW':  'New',
  '&T.SAVE': "Saving",
  '&T.LOAD': 'Loading',
  '&T.ABOUT': 'About',
}

/**
 * Graph logic goes here!!
 *
 * Proptypes
 * @param {paramtype} paramname paramdescription
 * @param {Boolean} renderNetwork true if network is to be rendered
 */

class VisNetwork extends Component {

  constructor(props) {
    super(props);
    //setup vis.js stuff
    // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
    let shadowState = false;

    // create an array with nodes, and one with edges
    let nodesArray = [{
       id: "&T.START", 
       label: "Click me to get started!", 
       group: 'myGroup',
        x: 68,
        y: 15,
      },]; //generate the help node for new users
    let nodes = new DataSet(nodesArray);
    let edgesArray = [];
    let edges = new DataSet(edgesArray);

    //1 for added node, 0 for suggestion
    this.isSuggestionDict = {
      "&T.START": true,
    }; //Suggestion or Fully added class
    this.adjacencyCount = {
      "&T.START": false,
    };
    this.network = {};
    this.data = {
      nodes: nodes,
      edges: edges,
    },
    this.nodeIds = ["&T.START"],
    this.edgeIds = [],
    this.appRef = createRef();
    this.state={
        prevProcessedClass:'',
        clickToUse: true,
        autoResize: true,
        options: {
          nodes: {
             shape: 'dot',
             size: 8,
             borderWidth: 3,
             opacity: 0.3,
             font: {
               face: 'comfortaa',
             }
          },
        },
        // groups: MANUAL_COLORS ? GROUP_COLOR_OPTIONS : null,
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
    return SUGGESTED_NODE_OPACITY;
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

  updateEdgeOpacity = (classId, suggestionId, val) => {
    //reconstruct edge id
    const edgeId = this.getEdgeId(classId, suggestionId, val);
    this.data.edges.update([{ id: edgeId, color: {opacity: 1}}]);
  }

  //for 7.05 this reduces the afterreqs from 76 to 49
  //removes "special versions of GIRs and similar" as well as "permission of instructor" and other non-class "prereqs"
  filterClutterClasses = (classList) => {
    return classList.filter((classId) => {
      return (!CLUTTER_COURSES.includes(this.getCourseId(classId))&&classId.length<10);
    });
  }

 decrementAdjacencyStatus = (classId) => {
   this.adjacencyCount[classId]--;
 }

 findSuggestedEdge = (classId, suggestionId) => {
    const edgesFromSuggestion = this.network.getConnectedEdges(suggestionId);
    const edgeToSuggestionId = edgesFromSuggestion.find((edgeId) => {
      return edgeId.split(/[<,>,=]/).includes(classId);
    });
    return edgeToSuggestionId;
 }

 removeAdjacentSuggestions = (classId, adjacentNodes) => {
  let [edgesToRemove,nodesToRemove] = [[],[]];
  adjacentNodes.forEach((nodeId) => {
    this.adjacencyCount[nodeId]--;
    //deal with all neighboring suggestions
    if(this.isSuggestionDict[nodeId]){
      //if node no longer has any added neighbors
      if(this.adjacencyCount[nodeId] === 0){
        edgesToRemove = edgesToRemove.concat(this.network.getConnectedEdges(nodeId));
        this.data.nodes.remove({id: nodeId});
        nodesToRemove.push(nodeId);
      }else{
        //suggestion is still relevant, but edge to classId must be deleted
        const edgeToSuggestionId = this.findSuggestedEdge(classId, nodeId);
        this.data.edges.remove({id: edgeToSuggestionId});
        edgesToRemove.push(edgeToSuggestionId);
      }
    }
  });
  this.nodeIds = this.nodeIds.filter((nodeId) => {
    return !nodesToRemove.includes(nodeId);
  })
  return edgesToRemove;
 }

  processRemoval = (classId) => {
    if(!this.nodeIds.includes(classId) || (this.nodeIds.includes(classId) && this.isSuggestionDict[classId])) return;
    //else, this node is available AND added
    //adjacent nodes
    const adjacentNodes = this.network.getConnectedNodes(classId);
    //reduce the adjacency value of each neighboring node
    //remove now-irrelevant suggestions
    const edgesToRemove = this.removeAdjacentSuggestions(classId, adjacentNodes);
    this.isSuggestionDict[classId] = true;
    //if this node has another added neighbor, it is demoted to a suggestion
    if(this.adjacencyCount[classId] !== 0){
      this.updateNodeOpacity(classId, SUGGESTED_NODE_OPACITY);
      const adjacentEdges = this.network.getConnectedEdges(classId);
      adjacentEdges.forEach((edgeId) => {
        if(!edgesToRemove.includes(edgeId)){
          this.data.edges.update([{ id: edgeId, color: {opacity: SUGGESTED_EDGE_OPACITY}}]);
        }
      });
    }else if(this.adjacencyCount[classId] === 0){
      //completely remove node and all of its edges
      this.nodeIds.splice(this.nodeIds.indexOf(classId),1);
      this.data.nodes.remove({id: classId});
    }
    //remove edgesIds at end so that it doesn't delay visual network update
    edgesToRemove.forEach((edgeId) => {
      this.data.edges.remove({id: edgeId});
    });
    this.edgeIds = this.edgeIds.filter((edgeId) => {
      return !edgesToRemove.includes(edgeId);
    });
    this.printCurrentNetworkData();
  }
  //adds class newUpdate to network, adds suggestions to neighbors
  processAddition = async (classId) => {
    if(this.alreadyAddedNode(classId)){
      if(!this.isSuggestionDict[classId]) return;
      else this.updateToFull(classId);
    }
    else this.addNode(classId, false, 1);
    const neighbors = await this.props.getNeighbors(classId);
    console.log("current class: " + classId);
    console.log(neighbors);
    console.log("before filter:");
    console.log(neighbors.afterreqsToAdd);
    const prereqsToAdd = this.filterClutterClasses(neighbors.prereqsToAdd);
    const coreqsToAdd = this.filterClutterClasses(neighbors.coreqsToAdd);
    const afterreqsToAdd = this.filterClutterClasses(neighbors.afterreqsToAdd);
    console.log("after filter:");
    console.log(afterreqsToAdd);
    prereqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 0);
    });
    coreqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 1);
    });
    afterreqsToAdd.forEach((suggestionId) => {
      this.processSuggestionAddition(classId, suggestionId, 2);
    });
    this.setState({
      prevProcessedClass: classId,
    });
    this.printCurrentNetworkData();
  }

  //parameters classId: class which was recently added to network, suggestionId: the current suggestion related to classId, 
  //val: 0 for prereq, 1 for coreq, 2 for after_subject
  processSuggestionAddition = (classId, suggestionId, val) => {
    console.log("processing: " + classId + " to " + suggestionId);
    if(!this.alreadyAddedNode(suggestionId)){
      this.addNode(suggestionId,true,this.relevanceToCurrentNetwork(suggestionId));
      this.addEdge(classId, suggestionId, val);
      console.log("moo");
    } else if(this.isSuggestionDict[suggestionId]){
      this.updateNodeOpacity(suggestionId,this.relevanceToCurrentNetwork(suggestionId));
      this.addEdge(classId, suggestionId, val);
      console.log("maa");
      ///below case correspods to a prereq/afterreq assymetry
    } else if(!this.isSuggestionDict[suggestionId]){
      if(!this.edgeIds.includes(this.getEdgeId(classId,suggestionId,val))) this.adjacencyCount[classId]++;
      this.addEdge(classId, suggestionId, val);
      this.updateEdgeOpacity(classId, suggestionId, val);
      console.log("miii");
    } else{
      console.log("none were true!");
    }
    this.adjacencyCount[suggestionId]++;
  }

  //two parameters: nodeLabel=courseID
  addNode = (classId, suggestionStatus, opacity) => {
    if(this.alreadyAddedNode(classId)) return;
    this.isSuggestionDict[classId]=suggestionStatus;
    const courseId = this.getCourseId(classId);
    const label = (classId.includes('&')) ? TUTORIAL_LABELS[classId] : classId;
    this.data.nodes.add({ id: classId, label: label, opacity: opacity, group: courseId}); //add group
    this.nodeIds.push(classId);
    this.adjacencyCount[classId] = 0;
   }

   getCourseId = (classId) => {
     return classId.split('.')[0];
   }

   //edge id is of the form SMALLER_CLASS@LARGER_CLASS (wrt string order)
   getEdgeId = (classFrom, classTo, val) => {
     const relationList = ['>', "=", "<"];
     return (classFrom < classTo) ? (classFrom + relationList[val] + classTo) : (classTo + relationList[2-val] + classFrom);
   }

   getEdgeOpacity = (classFrom, classTo) => {
     return (!this.isSuggestionDict[classFrom] && !this.isSuggestionDict[classTo]) ? 1 : SUGGESTED_EDGE_OPACITY;
   }

   getEdgeOptions = (classFrom, classTo, val) => {
     let prereq, afterreq;
     let type = (val !== 1) ? 'arrow' : 'diamond';
     if(val === 0){
       [prereq, afterreq] = [classTo, classFrom];
     } else{
       [prereq, afterreq] = [classFrom, classTo];
     }
     const edgeOptions = {
        prereq: prereq,
        afterreq: afterreq,
        type: type,
     }
     return edgeOptions;
    }

   //TODO: add functionality for val
   addEdge = (classFrom, classTo, val) => {
    //check if edge already exists
    const edgeId = this.getEdgeId(classFrom, classTo, val);
    if(this.alreadyAddedEdge(edgeId)) return;
    const edgeOptions = this.getEdgeOptions(classFrom, classTo, val);
    const opacity = this.getEdgeOpacity(classFrom, classTo);
    this.data.edges.add({
      id: edgeId,
      from: edgeOptions.prereq,
      to: edgeOptions.afterreq,
      color: {
        opacity: opacity,
      },
      arrows: {
        middle: {
          enabled: true,
          type: edgeOptions.type,
        }
      }
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

   //prepares current node data for export
   getNodeData = () => {
    let nodeData = [];
    const nodePositions = this.network.getPositions();
    Object.keys(nodePositions).forEach((classId) => {
      nodeData.push({
        x: nodePositions[classId].x,
        y: nodePositions[classId].y,
        id: classId,
        opacity: this.isSuggestionDict[classId] ? SUGGESTED_NODE_OPACITY : 1,
      });
     });
    return nodeData;
   }

   //prepares current edge data for export
   //edges are represented as strings courseOne + RELATION + courseTwo + '@' + opacity, where courseOne <= courseTwo wrt string order, 
   //and RELATION is the prereq/aftererq relation (</> or = for coreq)
   //for example, an edge between 18.117 and 18.965 would be `18.117>18.965@1' for a full opacity edge
   //TO DO need to handle tutorial edges (connected to "Click me to start!" differently) --> HANDLE THIS WITH '@3'
   getEdgeData = () => {
    let edgeData = [];
    this.edgeIds.forEach((edgeId) => {
      const endpoints = edgeId.split(/[<,>,=]/);
      const [classFrom, classTo] = endpoints;
      const opacityIndicator = (!this.isSuggestionDict[classFrom] && !this.isSuggestionDict[classTo]) ? '1' : '0'; //check for @3 for special edges
      const edgeStorageId = edgeId + '@' + opacityIndicator;
      edgeData.push(edgeStorageId);
    });
    return edgeData;
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

   printCurrentNetworkData = () => {
    console.log("PRINTING CURRENT NETWORK DATA");
    console.log(this.nodeIds);
    console.log(this.edgeIds);
    console.log(this.isSuggestionDict);
    console.log(this.adjacencyCount);
    this.printCurrentExportData();
   }

   printCurrentExportData = () => {
     console.log(this.getCurrentNetworkData());
   }

  //reconstructs Node data from imported array
   parseForNodeData = (nodeArray) => {
    let nodes = [];
    nodeArray.forEach((node) => {
      const nodeId = node.id;
      const courseId = this.getCourseId(nodeId);
      const label = (nodeId.includes('&')) ? TUTORIAL_LABELS[nodeId] : nodeId;
      nodes.push({
        id: nodeId,
        label: label,
        x: node.x,
        y: node.y,
        opacity: node.opacity,
        group: courseId,
      });
    });
    return new DataSet(nodes);
   }

  //idea for future: to handle special edges (ie tutorial edges), do '@3' at the end
  //prototypical edgeStorageID: `18.117>18.965@1'
  retrieveEdgeInfoFromStorageId = (edgeStorageId) => {
    const edgeSplit = edgeStorageId.split('@');
    const opacity = (edgeSplit[1] === '1') ? 1 : SUGGESTED_EDGE_OPACITY;
    const edgeId = edgeSplit[0];
    let prereq, afterreq, type = 'arrow';
    if(edgeId.includes('>')){
      const classIds = edgeId.split('>');
      [prereq, afterreq] = [classIds[1],classIds[0]];
    }else if(edgeId.includes('=')){
      const classIds = edgeId.split('=');
      [prereq, afterreq] = [classIds[1],classIds[0]];
      type = 'diamond';
    }else if(edgeId.includes('<')){
      const classIds = edgeId.split('<');
      [prereq, afterreq] = [classIds[0],classIds[1]];
    }
    const edgeInfo = {
      id: edgeId,
      prereq: prereq,
      afterreq: afterreq,
      opacity: opacity,
      type: type,
    }
    return edgeInfo;
  }

  //reconstructs Edge data from imported array
  //edge Ids in imported array of form `18.117>18.965@1'
  //TO DO: handle tutorial edges separately (thise are not of the above form)
  parseForEdgeData = (edgeArray) => {
    let edges = [];
    edgeArray.forEach((edgeStorageId) => {
      const edgeInfo = this.retrieveEdgeInfoFromStorageId(edgeStorageId);
      edges.push({
        id: edgeInfo.id,
        from: edgeInfo.prereq,
        to: edgeInfo.afterreq,
        color: {
          opacity: edgeInfo.opacity
        },
        arrows: {
          middle: {
            enabled: true,
            type: edgeInfo.type,
          },
        },
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
      edgeArray.forEach((edgeId) => {
        edgeIds.push(edgeId.split('@')[0]);
      });
      return edgeIds;
   }

   setNetworkToNewData =  async (newNodes, newEdges, newNodeIds, newEdgeIds) => {
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
      nodeArray.forEach((elem) => {
        this.isSuggestionDict[elem.id] = (elem.opacity === 1) ? false : true;
      });
   }

   setAdjacencyCountToNewData = () => {
     //step1, set all keys to zero
     Object.keys(this.adjacencyCount).forEach((classId) => {
      this.adjacencyCount[classId] = 0;
     });
      //loop throuh all nodeId's
     this.nodeIds.forEach((nodeId) => {
       //count number of fully added neighbors
       this.adjacencyCount[nodeId] = 0;
       const neighbors = this.network.getConnectedNodes(nodeId);
       neighbors.forEach((neighborId) => {
         this.adjacencyCount[nodeId] += (!this.isSuggestionDict[neighborId] ? 1 : 0);
       });
     });
   }
  
   resetNetwork = () => {
     let newNodes = new DataSet([{ id: "&T.START", label: "Click me to get started!"},]);
     let newEdges = new DataSet();
     this.nodeIds.forEach((classId) => {
        this.isSuggestionDict[classId] = true;
        this.adjacencyCount[classId] = 0;
     });
     //must update state as well so state and network work with same object

     this.network.setData({
       nodes: newNodes,
       edges: newEdges,
     });
     this.data.nodes = newNodes,
     this.data.edges = newEdges,
     this.nodeIds = ["&T.START"];
     this.edgeIds = [];
     this.printCurrentNetworkData();
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
      console.log(newNetworkData);
      const nodeArray = newNetworkData.nodeArray;
      const edgeArray = newNetworkData.edgeArray;
      //create data = {nodes: , edges: }, and edgeId's, and suggestionId's
      let newNodes = this.parseForNodeData(nodeArray);
      let newEdges = this.parseForEdgeData(edgeArray);
      let newNodeIds = this.parseForNodeIdData(nodeArray);
      let newEdgeIds = this.parseForEdgeIdData(edgeArray);
      //update isSuggestionDict
      this.setNetworkToNewData(newNodes, newEdges, newNodeIds, newEdgeIds);
      //update isSuggestionDict to reflect new data
      this.setSuggestionDictToNewData(nodeArray);
      //update adjacencyCounts to reflect new data
      this.setAdjacencyCountToNewData(); //TO DO
      //test new network
      this.printCurrentNetworkData();
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
    if(this.props.newClass && this.props.newClassCounter !== prevProps.newClassCounter) this.processAddition(this.props.newClass);
    //process removing class
    if(this.props.removeClass && this.props.removeClassCounter !== prevProps.removeClassCounter) this.processRemoval(this.props.removeClass);
    //if canvasToBeReset isn't previous canvasToBeReset, update
    if(this.props.canvasToBeReset !== prevProps.canvasToBeReset) this.resetNetwork();
    if(this.props.saveCanvasCounter !== prevProps.saveCanvasCounter) this.saveNetwork();
    if(this.props.loadCollectionCounter !== prevProps.loadCollectionCounter) this.loadNetwork();
  }

  render() {
    return (
        <>
            <div ref={this.appRef} className = "VisNetwork-container" id = "myNetwork" />
        </>
    );
  }
}

export default VisNetwork;