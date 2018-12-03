var fs = require('fs');
var data = fs.readFileSync('./input.txt', 'utf8');


const part1 = () => {
  let numberOf2 = 0;
  let numberOf3 = 0;
  let res = data.split('\n')

  //on ne peut pas utiliser arrow func comme constructeur..
  function Letter(a) {
      this.id = a;
      this.amount =  0;
      this.increment = function() {
        this.amount++;
      };
    }

  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  //pour chaque ligne
  for(let i = 0; i < res.length; i++){
    let dictionnary = [];

    //populate dictionnary with alphabet
    for(let x = 0; x < alphabet.length ; x++){
      a = new Letter(alphabet[x]);
      dictionnary.push(a)
    }

    //pour chaque lettre de la ligne
    for(let letter = 0; letter < res[i].length; letter++){
      dictionnary.forEach((x)=>{
        if(x.id === res[i][letter]){
          x.increment();
        }
      })
    }

    if(dictionnary.some((x)=>{return x.amount === 2})){
      numberOf2++;
    }

    if(dictionnary.some((x)=>{return x.amount === 3})){
      numberOf3++;
    }
  }
  sum = numberOf2 * numberOf3;
  console.log(sum)
}

const part2 =()=>{
  let res = data.split('\n')

  for(let i = 0; i < res.length; i++){
    for(let y = 0; y < res.length; y++){
      if(i === y){continue;}

      nbDiff = 0;
      lastOccurence = 0;

      for(let n = 0; n < res[0].length; n++){
        if(res[i].charAt(n) !== res[y].charAt(n)){
          nbDiff++;
          lastOccurence = n;
        }
      }

      if(nbDiff === 1){
        //redonne un string moins le char au lastOccurence. 
        str = res[i].slice(0,lastOccurence-1) + res[i].slice(lastOccurence, res.length)
        console.log(str)
      }
    }
  }

}

part1();
part2();
