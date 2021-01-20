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

//colors, courtesy of https://wondernote.org/color-palettes-for-web-digital-blog-graphic-design-with-hexadecimal-codes/
const MANUAL_COLORS = true;

/*sample group options
  "courseNumber": {
    color: "#00C3AF",
    borderWidth: 3,
  },
*/

const GROUP_COLOR_OPTIONS = {
  1: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  2: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  3:{ 
    color: "#00C3AF",
    borderWidth: 3,
  }, 
  4: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  5: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  6: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  7: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  8: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  9: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  10: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  11: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  12: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  14: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  15: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  16: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  17: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  18: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  20: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  21: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  22: {
    color: "#00C3AF",
    borderWidth: 3,
  },
  myGroup: {
    color: "#00C3AF",
    borderWidth: 3,
  }
}

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

class VisNetwork extends Component {

  constructor(props) {
    super(props);
    //setup vis.js stuff
    // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
    let shadowState = false;

    // create an array with nodes, and one with edges
    let nodesArray = [{ id: "Click me to get started!", label: "Click me to get started!", group: 'myGroup'},]; //generate the help node for new users
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
        clickToUse: true,
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
        groups: MANUAL_COLORS ? GROUP_COLOR_OPTIONS : null,
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
    }
  }

  //two parameters: nodeLabel=courseID
  addNode = (classId, suggestionStatus, opacity) => {
    if(this.alreadyAddedNode(classId)) return;
    this.isSuggestionDict[classId]=suggestionStatus;
    const courseId = this.getCourseId(classId);
    this.data.nodes.add({ id: classId, label: classId, opacity: opacity, group: courseId}); //add group
    this.nodeIds.push(classId);
   }

   getCourseId = (classId) => {
     return classId.split('.')[0];
   }

   //edge id is of the form SMALLER_CLASS@LARGER_CLASS (wrt string order)
   getEdgeId = (classFrom, classTo, val) => {
     const relationList = ['>', "=", "<"];
     return (classFrom < classTo) ? (classFrom + relationList[val] + classTo) : (classTo + relationList[2-val] + classFrom);
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
    console.log(edgeOptions);
    this.data.edges.add({
      id: edgeId,
      from: edgeOptions.prereq,
      to: edgeOptions.afterreq,
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
        opacity: this.isSuggestionDict[classId] ? 0.5 : 1,
      });
     });
    return nodeData;
   }

   //prepares current edge data for export
   getEdgeData = () => {
    let edgeData = [];
    this.edgeIds.forEach((edgeId) => {
      const endpoints = edgeId.split('@');
      edgeData.push({
        from: endpoints[0],
        to: endpoints[1],
      });
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

  //reconstructs Node data from imported array
   parseForNodeData = (nodeArray) => {
    let nodes = [];
    nodeArray.forEach((node) => {
      const courseId = this.getCourseId(node.id);
      nodes.push({
        id: node.id,
        label: node.id,
        x: node.x,
        y: node.y,
        opacity: node.opacity,
        group: courseId,
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
        edgeIds.push(this.getEdgeId(edge.to,edge.from));
      })
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
    //  const newNodesAndEdges = {
    //    nodeIds: newNodeIds,
    //    edgeIds: newEdgeIds,
    //  }
    //  return newNodesAndEdges;
   }

   setSuggestionDictToNewData = (nodeArray) => {
      //step 1, set everyhing currently in SuggestionDict to false
      Object.keys(this.isSuggestionDict).forEach((classId) => {
         this.isSuggestionDict[classId] = true
        });
      //step 2, set all new nodes from newNetworkData according to their opacity (not suggestion if opacity is 1, suggestion otherwise)
      nodeArray.forEach( (elem) => {
        this.isSuggestionDict[elem.id] = (elem.opacity === 1) ? false : true;
      });
   }
  
   resetNetwork = () => {
     let newNodes = new DataSet([{ id: "Click me to get started!", label: "Click me to get started!"},]);
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
    if(this.props.saveCanvasCounter !== prevProps.saveCanvasCounter) this.saveNetwork();
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