let fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

findBoardSize =(data)=>{
  maxI = 1;
  maxJ = 1;
  for(let i = 0; i < data.length; i++){
    data[i] = data[i].replace(" ","");
    data[i] =  data[i].split(",");
    let x = parseInt(data[i][0]);
    let y = parseInt(data[i][1]);

    if(x > maxI){
      maxI = x;
    }
    if(y > maxJ){
      maxJ = y;
    }
  }
  coord = [maxI,maxJ];
  return coord;
}

findBoardSizePart2=(data)=>{
  maxI = 1;
  maxJ = 1;

  for(let i = 0; i < data.length; i++){
    let x = parseInt(data[i][0]);
    let y = parseInt(data[i][1]);
    if(x > maxI){
      maxI = x;
    }
    if(y > maxJ){
      maxJ = y;
    }
  }
  coord = [maxI,maxJ];
  return coord;
}

findNearest=(i,j,data) =>{
  //find distance
  totalDistances = [];
  for(let n = 0; n < data.length; n++){
    totalDistances.push(Math.abs(j - (parseInt(data[n][0])))+(Math.abs(i - (parseInt(data[n][1])))));
  }

  //checks who is the closest
  let minDist = Number.POSITIVE_INFINITY;
  let closestElement;
  for(let n = 0; n < totalDistances.length;n++){
    if(totalDistances[n] <= minDist){
      minDist = totalDistances[n];
      closestElement = n;
    }
  }

  //looks if theres a clash
  let count = 0;
  for(let n = 0; n < totalDistances.length;n++){
    if(totalDistances[n] === minDist){
      count++;
    }
  }
  if(count === 1){
    return closestElement;
  }
    return (".");
}

findClosest=(i,j,data) =>{
  //find distance
  totalDistances = [];
  for(let n = 0; n < data.length; n++){
    totalDistances.push(Math.abs(j - (parseInt(data[n][0])))+(Math.abs(i - (parseInt(data[n][1])))));
  }
  sum = 0;
  //calculates the total distance to all points
  for(let n = 0; n < totalDistances.length; n++){
    sum = sum + totalDistances[n];
  }
  return sum;
}

findInfinites = (board) =>{
  listOfExcludes = [];

  //vertical lookup
  for(let i = 0; i < board.length; i++){
    left = board[i][0];
    right = board[i][board[0].length -1];
    if(!listOfExcludes.includes(left)){
      listOfExcludes.push(left)
    }
    if(!listOfExcludes.includes(right)){
      listOfExcludes.push(right)
    }
  }

  //horizontal lookup
  for(let i = 0; i < board[0].length; i++){
    top = board[0][i];
    bottom = board[board.length -1][i];
    if(!listOfExcludes.includes(top)){
      listOfExcludes.push(top)
    }
    if(!listOfExcludes.includes(bottom)){
      listOfExcludes.push(bottom)
    }
  }
  return listOfExcludes;
}

part1 = () =>{
  data = data.split("\n")
  elements = new Map();

  //find all elements
  for(let i = 0; i < data.length; i++){
    elements.set(i,0);
  }

  elements.set('.',0);
  maxSize = findBoardSize(data);

  //builds the board
  let board = [];
  for(let i = 0; i <= maxSize[1]; i++){
    let array = [];
    for(let j = 0; j <= maxSize[0]; j++){
      array.push(findNearest(i,j,data));
    }
    board.push(array);
  }

  //if the point is touching the edge, it's group will be infinite.
  listofInfinites = findInfinites(board);

  calculateLargestArea(board,listofInfinites);

  //calculates the number of occurents of each possible value.
  for(let i = 0; i < board.length; i++){
    for(let j = 0 ; j< board[0].length; j++){
      if(!listofInfinites.includes(board[i][j])){
        count = elements.get(board[i][j]);
        count++;
        elements.set(board[i][j],count);
      }
    }
  }

  //finds the biggest field of valid value
  let maxCount = 0;
  elements.forEach((value, key,)=>{
    if(value > maxCount){
      maxCount = value;
    }
  });
  console.log("part 1 : "+ maxCount.toString());
}

part2=()=>{
  elements = new Map();

  //find all elements
  for(let i = 0; i < data.length; i++){
    elements.set(i,0);
  }
  elements.set('.',0);
  maxSize = findBoardSizePart2(data);

  //builds the board with the total distance to all spots of the point.
  let board = [];
  for(let i = 0; i <= maxSize[1]; i++){
    let array = [];
    for(let j = 0; j <= maxSize[0]; j++){
      array.push(findClosest(i,j,data));
    }
    board.push(array);
  }

  //calculate the total amount of points with a distance less than 10000
  count = 0;
  for(let i = 0; i < board.length; i++){
    for(let j = 0 ; j< board[0].length; j++){
      if(board[i][j] < 10000){
        count++;
      }
    }
  }

  console.log("part 2 :" + count.toString())
};

part1();
part2();