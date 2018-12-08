//faire une grosse liste chainee.

//object noeud qui pointe sur le prochain.

//debut == noeud qui a personne qui pointe dessu

//fin == pointe sur personne

let fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

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

findFirstsStep = (allSteps,listOfNodes) =>{
  let firsts = [];

  for(let i = 0; i < allSteps.length; i++){
    if(!listOfNodes.has(allSteps[i])){
      firsts.push(allSteps[i]);
    }
  }
  return firsts;
}

findOrder = (firsts, listOfNodes, allSteps) =>{
  order = [];
  availables = [];

  firsts.sort((a,b)=>{
    return a.charCodeAt(0) - b.charCodeAt(0);
  })

  // for(let i = 0; i < firsts.length;i++){
  //   order.push(firsts[i]);
  // }

  order.push(firsts[0]);
  firsts.splice(0,1);

  for(let i = 0; i < firsts.length;i++){
    availables.push(firsts[i]);
  }

  listOfNodes.forEach((value,key)=>{
    bool = true;

    for(let n =0; n < value.length;n++){
      if(!order.includes(value[n])){
        bool = false;
      }
    }

    if(bool){
      availables.push(key);
    }
  });

  availables.sort((a,b)=>{
    return a.charCodeAt(0) - b.charCodeAt(0);
  })

  console.log(availables)
  console.log(order)
  index = 0;
  while(order.length !== allSteps.length){

    let currentStep = availables[0];

    ///C'EST ICI LE BUG, ON ARRIVE PAS A ENLEVER LE premier dude de availables....
    availables.splice(0,1);

    //adds an item
    order.push(currentStep);

    listOfNodes.forEach((value,key)=>{
      bool = true;
      for(let n =0; n < value.length;n++){
        if(!order.includes(value[n])){
          bool = false;
        }
      }
      if(bool){
        availables.push(key);
      }
    });

    availables.sort((a,b)=>{
      return a.charCodeAt(0) - b.charCodeAt(0);
    })
    console.log(order)
  }
  return order;
}

part1 = () =>{
  instructions = data.split("\n");

  // node = new Node("a");
  allSteps = findAllSteps(instructions);

  listOfNodes = buildTree(instructions);

  firsts = findFirstsStep(allSteps,listOfNodes);

  stepsInOrder = findOrder(firsts, listOfNodes, allSteps);

  console.log("stepsInOrder")
  console.log(stepsInOrder)



}

part1();