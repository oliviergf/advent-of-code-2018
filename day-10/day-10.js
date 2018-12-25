let fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');
let stars = data.split('\n')

/*
  https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
*/
function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

part1 = () =>{

  let initialCoordinates = [];
  let coordinates = [];


  for(let i = 0 ; i < stars.length; i ++){
    text = getMatches(stars[i], /\<(.*?)\>/g, 1);
    coord = [];
    positions = text[0].split(",");
    velocity = text[1].split(",");

    coord.push(parseInt(positions[0]))
    coord.push(parseInt(positions[1]))
    coord.push(parseInt(velocity[0]))
    coord.push(parseInt(velocity[1]))
    initialCoordinates.push(coord)
  }

  let squareArea = [];
  let messageSquare = [];
  let messagePosition = [];
  let startPoint = [];

  for(let second = 1; second < 100000; second++){
    let positionsAtSecond = [];
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    for(let i = 0; i < initialCoordinates.length;i++){
      posX = initialCoordinates[i][0] + second * initialCoordinates[i][2]
      posY = initialCoordinates[i][1] + second * initialCoordinates[i][3]
      pos = [posX,posY];
      positionsAtSecond.push(pos)

      if(posX > maxX){
        maxX = posX;
      }
      if(posX < minX){
        minX = posX;
      }
      if(posY > maxY){
        maxY = posY
      }
      if(posY < minY){
        minY = posY;
      }
    }
    area = (maxX - minX) * (maxY - minY);
    squareArea.push(area);
    sp = [];
    sp.push(minX)
    sp.push(maxY)
    startPoint.push(sp)
  }

  let min = Number.POSITIVE_INFINITY;
  let messageSecond = 0;

  for(let i = 0; i < squareArea.length; i++){
    if(squareArea[i] < min){
      min = squareArea[i];
      messageSecond = i;
    }
  }

  for(let h = messageSecond - 10; h < messageSecond +30; h++){

    for(let i = 0; i < initialCoordinates.length; i++){
      posX = (initialCoordinates[i][0] + h * initialCoordinates[i][2]) - startPoint[h][0];
      posY = (initialCoordinates[i][1] + h * initialCoordinates[i][3]) - startPoint[h][1];
      pos = [Math.abs(posX),Math.abs(posY)];
      messagePosition.push(pos)
    }


    for(let j = 0; j < 60; j++){
      let line = []
      for(let i = 0; i < 300; i++){
        boo = false;
        for(let n = 0; n < messagePosition.length;n++){
          if(messagePosition[n][0] === i && messagePosition[n][1] === j){
            boo = true;
          }
        }

        if(boo === true){
          line.push("*")
        }else{
          line.push(" ")
        }
      }
      // line = line.toString();
      console.log(line.join(""))
    }

    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()
  }

}

part1();

