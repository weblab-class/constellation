import {DataView, DataSet, Network } from 'vis-network/standalone/umd/vis-network.min';
import React, { Component, createRef } from "react";
import { GiBlackHandShield } from 'react-icons/gi';

import "./VisNetwork.css";

/**
 * Graph logic goes here!!
 *
 * Proptypes
 * @param {function} getNeighbors returns neighbors to a particular node (prereqs/coreqs/afterreqs) to a clas
 * @param {function} setCourseObject used to process node click, sets course object to clicked node
 * @param {number} canvasToBeReset counter; incrementing triggers canvas reset
 * @param {number} saveCanvasCounter increment triggers saving current network contents
 * @param {number} loadCollectionCounter increment triggers loading
 * @param {function} exportNetwork export Network during save
 * @param {string} newClass new class to be added
 * @param {number} newClassCounter increment triggers current newClass to be added
 * @param {string} removeClass class to be removed
 * @param {number} removeClassCounter increment triggers current removeClass to be removed
 * @param {string} filterToToggle id of filter to toggle
 * @param {number} filterCounter increment triggers filter to toggle
 * @param {function} importNetwork used for visNetwork to retrieve network data from database during load
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

const COURSE_LIST = ["1","2","3","4","5","6","7","8","9","10","11","12","14","15",,"16","17","18","20","21","22"];
const FILTER_LIST = ['suggestion','&T','1','2','3','4','5','6','7','8','9','10','11','12','14','15','16','17','18','20','21','21A','21H','21G','21L','21M','21W','22','24','AS','CC','CMS','CSB','EC','EM','ES','HST','IDS','MAS','MS','NS','SCM','SP','STS','WGS']; //filter keys

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
  '&T.BASICS': 'Basics',
  '&T.ADD': 'Adding',
  '&T.REMOVE': 'Removing',
  '&T.SEARCH': 'Searching',
  '&T.FILE': 'Files',
  '&T.RESET': 'Resetting',
  '&T.NEW':  'New',
  '&T.SAVE': "Saving",
  '&T.LOAD': 'Loading',
  '&T.ABOUT': 'About',
  '&T.FILTER': 'Filtering',
}

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
       group: '&T',
        x: 0,
        y: 0,
      },]; //generate the help node for new users
    this.nodes = new DataSet(nodesArray);
    let edgesArray = [];
    this.edges = new DataSet(edgesArray);
    this.nodeView = new DataView(this.nodes, { filter: this.nodesFilter});
    this.edgeView = new DataView(this.edges, { filter: this.edgesFilter});
    //1 for added node, 0 for suggestion
    this.isSuggestionDict = {
      "&T.START": true,
    }; //Suggestion or Fully added class
    this.adjacencyCount = {
      "&T.START": false,
    };
    this.network = {};
    this.data = {
      nodes: this.nodeView,
      edges: this.edgeView,
    },
    this.filter = false;
    this.nodeIds = ["&T.START"],
    this.edgeIds = [],
    this.appRef = createRef();
    this.filterValues = {
      'suggestion': true, //whether or not to view suggestions
      '&T':true, //tutorial
      "1":true,
      "2":true,
      "3":true, 
      "4":true,
      "5":true,
      "6":true,
      "7":true,
      "8":true,
      "9":true,
      "10":true,
      "11":true,
      "12":true,
      "14":true,
      "15":true,
      "15":true,
      "16":true,
      "17":true,
      "18":true,
      "20":true,
      "21":true,
      "21A":true,
      "21H":true,
      "21G":true,
      "21L":true,
      "21M":true,
      "21W":true,
      "22":true,
      "24": true,
      "AS":true,
      "CC":true,
      "CMS":true,
      "CSB":true,
      "EC":true,
      "EM":true,
      "ES":true,
      "HST":true,
      "IDS":true,
      "MAS":true,
      "MS":true,
      "NS":true,
      "SCM":true,
      "SP":true,
      "STS":true,
      "WGS":true,
    }
    this.state={
        prevProcessedClass:'',
        clickToUse: true,
        autoResize: true,
        options: {
          nodes: {
             shape: 'dot',
             size: 8,
             borderWidth: 3,
             opacity: 0.38,
             font: {
               face: 'comfortaa',
             }
          },
          physics: {
            timestep: 0.3,
          },
          groups: {
            one:{
              color: "#00C3AF",
              borderWidth: 3,
            },
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
    return SUGGESTED_NODE_OPACITY;
  }

  //updates suggestion to fully added node
  updateToFull = (classId) => {
    this.isSuggestionDict[classId] = false; //error here
    this.updateNodeOpacity(classId, 1);
  }

  //set Node opacity to val
  updateNodeOpacity = (classId, val) => {
    this.nodes.update([{ id: classId, opacity: val }]); 
  }

  updateEdgeOpacity = (classId, suggestionId, val) => {
    //reconstruct edge id
    const edgeId = this.getEdgeId(classId, suggestionId, val);
    this.edges.update([{ id: edgeId, color: {opacity: 1}}]);
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

 //TODO --> make sure START cannot be removed via removing adjacent node
 removeAdjacentSuggestions = (classId, adjacentNodes) => {
  let [edgesToRemove,nodesToRemove] = [[],[]];
  adjacentNodes.forEach((nodeId) => {
    this.adjacencyCount[nodeId]--;
    //deal with all neighboring suggestions
    if(this.isSuggestionDict[nodeId]){
      //if node no longer has any added neighbors
      if(this.adjacencyCount[nodeId] === 0){
        edgesToRemove = edgesToRemove.concat(this.network.getConnectedEdges(nodeId));
        if(nodeId !== '&T.START'){
          this.nodes.remove({id: nodeId});
          nodesToRemove.push(nodeId);
        }
      }else{
        //suggestion is still relevant, but edge to classId must be deleted
        const edgeToSuggestionId = this.findSuggestedEdge(classId, nodeId);
        this.edges.remove({id: edgeToSuggestionId});
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
          this.edges.update([{ id: edgeId, color: {opacity: SUGGESTED_EDGE_OPACITY}}]);
        }
      });
    }else if(this.adjacencyCount[classId] === 0){
      //if node is tutorial start node, simply make it translucent
      //otherwise, remove it completely
      if(classId === '&T.START'){
        this.updateNodeOpacity(classId, SUGGESTED_NODE_OPACITY);
      }else{
        this.nodeIds.splice(this.nodeIds.indexOf(classId),1);
        this.nodes.remove({id: classId});
      }
    }
    //remove edgesIds at end so that it doesn't delay visual network update
    edgesToRemove.forEach((edgeId) => {
      this.edges.remove({id: edgeId});
    });
    this.edgeIds = this.edgeIds.filter((edgeId) => {
      return !edgesToRemove.includes(edgeId);
    });
    // this.printCurrentNetworkData();
  }
  //adds class newUpdate to network, adds suggestions to neighbors
  processAddition = async (classId) => {
    if(this.alreadyAddedNode(classId)){
      if(!this.isSuggestionDict[classId]) return;
      else this.updateToFull(classId);
    }
    else this.addNode(classId, false, 1);
    const neighbors = await this.props.getNeighbors(classId);
    const prereqsToAdd = this.filterClutterClasses(neighbors.prereqsToAdd);
    const coreqsToAdd = this.filterClutterClasses(neighbors.coreqsToAdd);
    const afterreqsToAdd = this.filterClutterClasses(neighbors.afterreqsToAdd);
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
  }

  //parameters classId: class which was recently added to network, suggestionId: the current suggestion related to classId, 
  //val: 0 for prereq, 1 for coreq, 2 for after_subject
  processSuggestionAddition = (classId, suggestionId, val) => {
    //console.log("processing: " + classId + " to " + suggestionId);
    if(!this.alreadyAddedNode(suggestionId)){
      this.addNode(suggestionId,true,this.relevanceToCurrentNetwork(suggestionId));
      this.addEdge(classId, suggestionId, val);
      //console.log("moo");
    } else if(this.isSuggestionDict[suggestionId]){
      this.updateNodeOpacity(suggestionId,this.relevanceToCurrentNetwork(suggestionId));
      this.addEdge(classId, suggestionId, val);
      //console.log("maa");
      ///below case correspods to a prereq/afterreq assymetry
    } else if(!this.isSuggestionDict[suggestionId]){
      if(!this.edgeIds.includes(this.getEdgeId(classId,suggestionId,val))) this.adjacencyCount[classId]++;
      this.addEdge(classId, suggestionId, val);
      this.updateEdgeOpacity(classId, suggestionId, val);
      //console.log("miii");
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
    this.nodes.add({ id: classId, label: label, opacity: opacity, group: courseId}); //add group
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
    this.edges.add({
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
    this.nodes.update([{ id: 1, color: { background: newColor } }]);
   }

   //prepares current node data for export
   getNodeData = () => {
    let nodeData = [];
    let nodesWithPositions = [];
    const nodePositions = this.network.getPositions();
    Object.keys(nodePositions).forEach((classId) => {
      nodesWithPositions.push(classId);
      nodeData.push({
        x: nodePositions[classId].x,
        y: nodePositions[classId].y,
        id: classId,
        opacity: this.isSuggestionDict[classId] ? SUGGESTED_NODE_OPACITY : 1,
      });
     });
    const nodeIdList=this.nodes.getIds();
    nodeIdList.forEach((nodeId) => {
      if(!nodesWithPositions.includes(nodeId)){
        nodeData.push({
          x: 0,
          y: 0,
          id: nodeId,
          opacity: this.isSuggestionDict[nodeId] ? SUGGESTED_NODE_OPACITY : 1,
        });
      }
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

   getFilterData = () => {
     const filterArray = [];
     FILTER_LIST.forEach((attribute) => {
       const filterSetting = this.filterValues[attribute];
       filterArray.push(filterSetting);
     });
     return filterArray;
   }

   //returns array that will be stored in database 
   getCurrentNetworkData = () => {
     const currentNodeData = this.getNodeData();
     const currentEdgeData = this.getEdgeData();
     const currentFilterArray = this.getFilterData();
     const currentNetworkData = {
       nodes: currentNodeData,
       edges: currentEdgeData,
       filterObject: currentFilterArray,
     }
     return currentNetworkData;
   }

   printCurrentNetworkData = () => {
    console.log("PRINTING CURRENT NETWORK DATA");
    console.log("nodeIds:");
    console.log(this.nodeIds);
    console.log("edgeIds:");
    console.log(this.edgeIds);
    console.log("suggestionDict:")
    console.log(this.isSuggestionDict);
    console.log("adjacencyCount:")
    console.log(this.adjacencyCount);
    console.log("PRITING EXPORT DATA");
    this.printCurrentExportData();
    console.log("FILTER_LIST");
    console.log(FILTER_LIST);
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


  //TODO - have it also update load settings (so that loading a network loads the saved settings as well)
   setNetworkToNewData =  async (newNodes, newEdges, newNodeIds, newEdgeIds) => {
     this.filter=true;
      this.nodeView = new DataView(newNodes, {filter: this.nodesFilter});
      this.edgeView = new DataView(newEdges, {filter: this.edgesFilter});
      this.network.setData({
       nodes: this.nodeView,
       edges: this.edgeView,
     });
     this.data.nodes = this.nodeView;
     this.data.edges = this.edgeView;
     this.nodes = newNodes;
     this.edges = newEdges;
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
  
   //does NOT clear filtered settings
   resetNetwork = () => {
     let newNodes = new DataSet([{ id: "&T.START", label: "Click me to get started!",group: '&T'},]);
     let newEdges = new DataSet();
     this.nodeView = new DataView(newNodes, {filter: this.nodesFilter});
     this.edgeView = new DataView(newEdges, {filter: this.edgesFilter});
     this.nodeIds.forEach((classId) => {
        this.isSuggestionDict[classId] = true;
        this.adjacencyCount[classId] = 0;
     });
     //must update state as well so state and network work with same object
     this.network.setData({
       nodes: this.nodeView,
       edges: this.edgeView,
     });
     this.data.nodes = this.nodeView;
     this.data.edges = this.edgeView;
     this.nodes = newNodes,
     this.edges = newEdges,
     this.nodeIds = ["&T.START"];
     this.edgeIds = [];
    //  this.printCurrentNetworkData();
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
      const newFilterValues = newNetworkData.filterObject;
      Object.keys(newFilterValues).forEach((key) => {
        this.filterValues[key] = newFilterValues[key];
      });
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

      //refresh filter with added information
      this.nodeView.refresh();
      this.edgeView.refresh();

      //test new network
      // this.printCurrentNetworkData();
   }

   //data view stuff belom
   //based off of https://visjs.github.io/vis-network/examples/network/data/dynamicFiltering.html

   //node filter
  nodesFilter = (node) => {
    const nodeId = node.id;
    //if suggestion is turned off
    if(!this.filter) return true;
    if(!this.filterValues['suggestion']&& this.isSuggestionDict[nodeId]){
      return false;
    }
    const courseId = this.getCourseId(nodeId);
    if(!this.filterValues[courseId]) return false;

    return true;
  };

  getEdgeRelevance = (endpoints) => {
      //check if suggestion is off and either is suggestion
      const [classFrom, classTo] = [endpoints[0], endpoints[1]];
      if(!this.filterValues['suggestion'] && (this.isSuggestionDict[classFrom] || this.isSuggestionDict[classTo])){
        return false;
      }else {
        const [courseFrom, courseTo] = [this.getCourseId(classFrom), this.getCourseId(classTo)];
        return this.filterValues[courseFrom] && this.filterValues[courseTo];
      }
  }
  //return value = nodeFilter(endpoint #1) AND nodeFilter(endpoint #2)
  edgesFilter = (edge) => {
    if(!this.filter) return true;
    const endpoints = edge.id.split(/[<,>,=]/);
    return this.getEdgeRelevance(endpoints);
  };

  printDataViewIds = () => {
    const currentIds = this.nodes.getIds();
    console.log(currentIds);
  }

  toggleFilter = (filterId) => {
    //updated status of filterId filter
    this.filter=true;
    this.filterValues[filterId]=!this.filterValues[filterId];
    this.nodeView.refresh();
    this.edgeView.refresh();
  }

  deployFilter = () => {
    this.filter = true;
    this.nodeView.refresh();
    this.edgeView.refresh();
  }

  turnOffFilter = () => {
    this.filter = false;
    this.nodeView.refresh();
    this.edgeView.refresh();
  }
   //data view stuff above

   focusOnStart = () => {
     this.network.focus('&T.START',{  
      scale: 0.65,
      offset: {x:0, y:0},
      locked: false,
      animation: { // -------------------> can be a boolean too!
       duration: Number,
       easingFunction: 'easeInQuint',
     }});
   }

  componentDidMount() {
    this.network = new Network(this.appRef.current, this.data, this.state.options);
    this.network.on("selectNode", (params) => {
      const nodeId = params.nodes[0];
      this.processNodeClick(nodeId);
    });
    setTimeout(this.focusOnStart, 500);
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
    if(this.props.filterCounter !== prevProps.filterCounter) this.toggleFilter(this.props.filterToToggle);
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
