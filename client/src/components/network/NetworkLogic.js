/*imports user network data
initializes visJS network, and provides network functionality such as:
    - add new edges
    -
*/

var nodeIds, shadowState, nodesArray, nodes, edgesArray, edges, network;

function startNetwork() {
  // this list is kept to remove a random node.. we do not add node 1 here because it's used for changes
  nodeIds = [2, 3, 4, 5];
  shadowState = false;

  // create an array with nodes
  nodesArray = [
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ];
  nodes = new vis.DataSet(nodesArray);

  // create an array with edges
  edgesArray = [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ];
  edges = new vis.DataSet(edgesArray);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  network = new vis.Network(container, data, options);
}

function addNode() {
  var newId = (Math.random() * 1e7).toString(32);
  nodes.add({ id: newId, label: "I'm new!" });
  nodeIds.push(newId);
}

function changeNode1() {
  var newColor = "#" + Math.floor(Math.random() * 255 * 255 * 255).toString(16);
  nodes.update([{ id: 1, color: { background: newColor } }]);
}

startNetwork();
