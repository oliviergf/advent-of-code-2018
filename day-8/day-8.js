let fs = require('fs');
let data = fs.readFileSync('./test.txt', 'utf8');

part1 = () => {

  let input = data.split(" ");
  let metaData = [];
  let height = 0;
  // console.log(input)
  // console.log(input.length)
  //
  // input.splice(2,3+2);
  //
  // console.log(input)
  // console.log(input.length)


  while(input.length !== 0){
    // console.log(input)

    var l = input.length;
    console.log(l)
    let searchbuffer = input.length - parseInt(input[1]);
    console.log(parseInt(input[1]))
    for(var i = 0; i < searchbuffer; i++){

        if(parseInt(input[i]) === height){
            let metaDataLength = parseInt(input[i+1]);

            for(let y = i + 2; y < i + 2 + metaDataLength;y++){
              metaData.push(input[y]);
            }
            i--;
            input.splice(i+1,metaDataLength+2);
            searchbuffer = input.length - parseInt(input[1]);
        }
    }
    height++;
  }
  sum = 0;
  for(let i = 0; i < metaData.length; i++){
    sum = sum + parseInt(metaData[i]);
  }
  console.log(sum)
}


part1();