/*imports user network data
  //handles general network utility functions
  //retrieves data from backend
*/

getNeighbors = (inputText) => {
  get("api/graphNode", {subject_id: inputText}).then((graphInfo) => {
    const prereqsToAdd = graphInfo.prerequisites;
    const coreqsToAdd = graphInfo.coreqs;
    const afterreqsToAdd = graphInfo.after_subjects;
  }).catch((err) => {
    console.log("Oops, there was an error trying to recieve classes!");
  });
  const neighbors = {
    prereqsToAdd: prereqsToAdd,
    coreqsToAdd: coreqsToAdd,
    afterreqsToAdd: afterreqsToAdd,
  };
  return neighbors;
}


//parameters: userId and tagId
//retrieves the collection belonging to userId with tag tagId
//returns the network data (edges, nodes, options)
getUserData = () => {
  //todo
}