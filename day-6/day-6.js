let fs = require('fs');
let data = fs.readFileSync('./test.txt', 'utf8');

findBoardSize =(data)=>{
  maxI = 1;
  maxJ = 1;

  for(let i = 0; i < data.length; i++){
    data[i] = data[i].replace(" ","");

    let x = parseInt(data[i].charAt(0));
    let y = parseInt(data[i].charAt(2));

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
    totalDistances.push(Math.abs(j - (parseInt(data[n].charAt(0))))+(Math.abs(i - (parseInt(data[n].charAt(2))))));
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

calculateLargestArea = (board,listofInfinites) =>{

}

part1 = () =>{
  data = data.split("\n")
  maxSize = findBoardSize(data);
  let board = [];

  for(let i = 0; i <= maxSize[1]; i++){
    let array = [];
    for(let j = 0; j <= maxSize[0]; j++){
      array.push(findNearest(i,j,data));
    }
    board.push(array);
  }

  console.log(board)
  console.log(board.length)
  console.log(board[1].length)

  listofInfinites = findInfinites(board);

  console.log(listofInfinites)

  calculateLargestArea(board,listofInfinites);
}

part1();