var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  console.log(timeDiff + " milliseconds");
}

function removeCharsAt(i,string){
  beginning = string.substring(0,i);
  ending = string.substring(i+2);
  return beginning.concat(ending);
}

function removeCharAt(i,string){
  beginning = string.substring(0,i);
  ending = string.substring(i+1);
  return beginning.concat(ending);
}

function findAllChars(data){
  dataTypes = [];
  for(let i =0; i < data.length;i++){
    x = data[i];
    if(!dataTypes.includes(x)){
      dataTypes.push(x);
    }
  }
  return dataTypes;
}

function filterData(char,data){
  let uniCode = char.charCodeAt(0);
  for(let i = 0; i < data.length;i++){
    if(data.charCodeAt(i) === uniCode || data.charCodeAt(i) === (uniCode-32)){
      data = removeCharAt(i,data);
    }
  }
  return data;
}



part1 = (data) => {
  index = 0;
  end = data.length;

  // // //32 || -32
  // console.log(testing.charCodeAt(1)- testing.charCodeAt(0))

  // test = "salutjesuiscool"
  // console.log(removeCharsAt(5,test))

  while(index !== end){
    charDiff = Math.abs(data.charCodeAt(index) - data.charCodeAt(index+1));

    //found collision
    if(charDiff === 32){
      data = removeCharsAt(index,data);
      end = data.length;
      index--;
    }else{
      end = data.length;
      index++;
    }
    return data.length;
  }
}

part2 =()=>{
  var fs = require('fs');
  var data = fs.readFileSync('./test.txt', 'utf8');

  var lowerCasesData = data.toLowerCase();
  var lowerCaseCharTypes = findAllChars(lowerCasesData);

  let minString = data.length;

  console.log(data)
  console.log("--------------");
  for(let i = 0; i < lowerCaseCharTypes.length; i++){

    dataFiltered = filterData(lowerCaseCharTypes[i],data,lowerCasesData);
    newDataLength = part1(dataFiltered);

    console.log(lowerCasesData)
    console.log(lowerCaseCharTypes[i]);
    console.log(dataFiltered);
    console.log("**************");


    if(newDataLength < minString){
      minString = newDataLength.length;
    }
  }

  console.log(minString)

}


part2();