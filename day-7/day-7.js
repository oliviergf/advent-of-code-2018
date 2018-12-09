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

  //adds the first
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
      listOfNodes.delete(key);
    }
  });

  availables.sort((a,b)=>{
    return a.charCodeAt(0) - b.charCodeAt(0);
  })

  while(order.length !== allSteps.length){
    availables.sort((a,b)=>{
      return a.charCodeAt(0) - b.charCodeAt(0);
    })

    let currentStep = availables[0];
    //adds an item
    order.push(currentStep);

    availables.shift();

    listOfNodes.forEach((value,key)=>{
      bool = true;
      for(let n =0; n < value.length;n++){
        if(!order.includes(value[n])){
          bool = false;
        }
      }
      if(bool){
        availables.push(key);
        listOfNodes.delete(key);
      }
    });
  }
  return order;
}

part1 = () =>{
  instructions = data.split("\n");

  allSteps = findAllSteps(instructions);

  listOfNodes = buildTree(instructions);

  firsts = findFirstsStep(allSteps,listOfNodes);

  // stepsInOrder = findOrder(firsts, listOfNodes, allSteps);
  // console.log("stepsInOrder")
  // console.log(stepsInOrder.toString());

  time = part2(firsts, listOfNodes, allSteps);
  console.log(time)
}


part2 = (firsts, listOfNodes, allSteps)=>{
  done = [];
  availables = [];
  workers = [];
  time = 0;

  firsts.sort((a,b)=>{
    return a.charCodeAt(0) - b.charCodeAt(0);
  })

  for(let i = 0; i < firsts.length;i++){
    availables.push(firsts[i]);
  }

  while(workers.length < 5 && availables.length !== 0){
    workers.push([availables[0].charCodeAt(0)-4,availables[0]]);
    availables.shift();
  }

  console.log(workers)
  console.log(availables)

  while(done.length !== allSteps.length){
    time++;

    //sorts availables
    availables.sort((a,b)=>{
      return a.charCodeAt(0) - b.charCodeAt(0);
    })

    //removes a second from tasks
    for(let n = 0; n < workers.length; n++){
      workers[n][0]--;
    }

    //check if any work done, if so, adds to done array and remove from worker
    for (var i = workers.length - 1; i >= 0; i--) {
      if (workers[i][0] === 0) {
          done.push(workers[i][1]);
          workers.splice(i, 1);
      }
    }

    //checks if we can add another step in availables
    listOfNodes.forEach((value,key)=>{
      bool = true;
      for(let n = 0; n < value.length;n++){
        if(!done.includes(value[n])){
          bool = false;
        }
      }
      if(bool){
        availables.push(key);
        listOfNodes.delete(key);
      }
    });

    //if theres workers and availables, push to workers and remove from availables
    while(workers.length < 5 && availables.length !== 0){
      workers.push([availables[0].charCodeAt(0)-4,availables[0]]);
      availables.shift();
    }
  }
  return time;
};

part1();