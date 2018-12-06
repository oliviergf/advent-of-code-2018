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
  let arrayData = data.split("");

  arrayData = arrayData.filter(element =>{
    return (element.charCodeAt(0) !== uniCode && element.charCodeAt(0) !== (uniCode-32))
  })

  return arrayData.join("");
}

part1 = (data) => {
  index = 0;
  end = data.length;

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
  }
  return data.length;
}

part2=()=>{
  let fs = require('fs');
  let data = fs.readFileSync('./input.txt', 'utf8');
  let lowerCasesData = data.toLowerCase();
  let lowerCaseCharTypes = findAllChars(lowerCasesData);

  let minString = data.length;
  let dataFiltered;

  for(let i = 0; i < lowerCaseCharTypes.length; i++){

    dataFiltered = filterData(lowerCaseCharTypes[i],data);
    newDataLength = part1(dataFiltered);

    if(newDataLength < minString){
      minString = newDataLength;
    }
  }
  console.log(minString)
}

part2();