var fs = require('fs');
var data = fs.readFileSync('./input.txt', 'utf8');

var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  console.log(timeDiff + " milliseconds");
}

part1And2 = () => {
  start();
  let claims = data.split('\n')
  let myMap = new  Map();

  extractPosition = (str) =>{
    res = str.slice(0, str.length-1)
    return res.split(",")
  }

  extractLength = (str) =>{
    return str.split("x")
  }

  fillMap = (x,y,lx,ly) => {
    for(let i = 0; i < lx; i++){
      for(let j = 0; j < ly; j++){
        position = (x + i).toString() + "," + (y + j).toString()
        if(myMap.has(position)){
          value = myMap.get(position);
          myMap.set(position, value + 1);
        }else{
          myMap.set(position, 1);
        }
      }
    }
  }

  findLonelyClaim = (x,y,lx,ly,id) => {
    found = true;
    for(let i = 0; i < lx; i++){
      for(let j = 0; j < ly; j++){
        position = (x + i).toString() + "," + (y + j).toString()
        if(myMap.get(position) !== 1){
          found = false;
        }
      }
    }
    if(found === true){
      console.log("FOUND THE GUY! id: " + id)
    }
  }

  //part 1
  for(let n = 0; n < claims.length -1 ; n++){
    data = claims[n].split(' ');
    x = parseInt(extractPosition(data[2])[0]);
    y = parseInt(extractPosition(data[2])[1]);
    lx = parseInt(extractLength(data[3])[0]);
    ly = parseInt(extractLength(data[3])[1]);
    fillMap(x,y,lx,ly)
  }

  //part2
  for(let n = 0; n < claims.length -1 ; n++){
    data = claims[n].split(' ');
    id = data[0];
    x = parseInt(extractPosition(data[2])[0]);
    y = parseInt(extractPosition(data[2])[1]);
    lx = parseInt(extractLength(data[3])[0]);
    ly = parseInt(extractLength(data[3])[1]);

    findLonelyClaim(x,y,lx,ly,id)
  }

  nbOfOverlap = 0;
  for (var value of myMap.values()) {
    if (value >= 2){
      nbOfOverlap++;
    }
  }
  console.log("number of overlaping cases: " + nbOfOverlap)
  end();
}

part1And2();
