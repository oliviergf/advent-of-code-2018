//faire une grosse liste chainee.

//object noeud qui pointe sur le prochain.

//debut == noeud qui a personne qui pointe dessu

//fin == pointe sur personne

let fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

// function Node(value) {
//   this.value = value;
//   this.before = [];
// }

findAllSteps = (instructions) =>{
  listAllSteps = [];
  for(let i = 0 ; i < instructions.length; i++){
    x = instructions[i].split(" ");
    before = x[1];
    step = x[7];

    if(!listAllSteps.includes(before)){
      listAllSteps.push(before);
    }

    if(!listAllSteps.includes(step)){
      listAllSteps.push(step)
    }
  }
  return listAllSteps;
}



buildTree = (instructions) =>{
  let nodeMap = new Map();

  for(let i = 0; i < instructions.length; i++){
    x = instructions[i].split(" ");
    before = x[1];
    step = x[7];

    if(nodeMap.has(step)){
      elementsToBeDoneBefore = nodeMap.get(step);
      elementsToBeDoneBefore.push(before);
      nodeMap.set(step,elementsToBeDoneBefore);
    }else{
      elementsToBeDoneBefore = [];
      elementsToBeDoneBefore.push(before);
      nodeMap.set(step,elementsToBeDoneBefore);
    }
  }
  return nodeMap;
}

findFirstStep = (allSteps,listOfNodes) =>{
  let first;

  for(let i = 0; i < allSteps.length; i++){
    if(!listOfNodes.has(allSteps[i])){
      first = allSteps[i];
    }
  }
  return first;
}

findOrder = (first, listOfNodes, allSteps) =>{
  order = [];
  order.push(first);
  availables = [];

  listOfNodes.forEach((value,key)=>{
    for(let i = 0; i < value.length; i++){
      if(value[i] === first){
        availables.push(key);
      }
    }
  })

  availables.sort((a,b)=>{
    return a.charCodeAt(0) - b.charCodeAt(0);
  })

  while(order.length !== allSteps.length){

    let currentStep = availables[0];
    availables.splice(0,1);

    //adds an item
    order.push(currentStep);

    //adds its successors to availables
    listOfNodes.forEach((value,key)=>{
      for(let i = 0; i < value.length; i++){
        if(value[i] === currentStep && (!availables.includes(key))){
          availables.push(key);
        }
      }
    })
    availables.sort((a,b)=>{
      return a.charCodeAt(0) - b.charCodeAt(0);
    })

  }
  console.log(order)
  return order;
}

part1 = () =>{
  instructions = data.split("\n");

  // node = new Node("a");
  allSteps = findAllSteps(instructions);

  console.log(allSteps)

  listOfNodes = buildTree(instructions);

  console.log(listOfNodes)

  first = findFirstStep(allSteps,listOfNodes);

  console.log(first)

  stepsInOrder = findOrder(first, listOfNodes, allSteps);


}

part1();