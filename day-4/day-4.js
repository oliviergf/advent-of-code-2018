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

function SleepShift() {
    this.start = [];
    this.end = [];
    this.totalSleep = 0;
    this.addStart = (time) =>{
      this.start.push(time);
    };
    this.addEnd = (time) =>{
      this.end.push(time);
    };
    this.validateData = () =>{
      return (this.start[0].split(":")[1]);
    };
    this.calculateTotalSleep = () =>{
      if(this.start.length > 0){
        for(let i = 0; i < this.start.length; i++){
          sTime = parseInt(this.start[i].split(":")[1]);
          eTime = parseInt(this.end[i].split(":")[1]);
          this.totalSleep = this.totalSleep + (eTime - sTime);
        }
      }
    };
    this.getTotalSleep =()=>{
      return this.totalSleep;
    };
  }

function convertToDateFormat(date){
  year = date.slice(0,4);
  month = date.slice(5,7);
  day = date.slice(8,10);
  hour = date.slice(11,13)
  min = date.slice(14,16)
  return new Date(year, month, day, hour, min, 0, 0);
}

part1 =()=>{
  events = data.split("\n");
  blank_space_ = events.pop();

  //sorts the data
  events.sort(function(a,b){
    aDate = a.slice(1,17);
    iso_date_a = convertToDateFormat(aDate);
    bDate = b.slice(1,17);
    iso_date_b = convertToDateFormat(bDate);
    return (iso_date_b - iso_date_a);
  });

  //reverse the array
  events.reverse();

  //converts the date format to iso, it just werks
  for(let i = 0; i < events.length; i++){
    date = events[i].slice(1,17);
    iso_date = convertToDateFormat(date);
    events[i] = events[i].replace(/\[([^}]+)\]/g,iso_date.toString());
  }

  let currentGuardId;
  let currentSleepShift;
  let myMap = new  Map();

  for(let i = 0; i < events.length; i++){
    currentAction = events[i].split(" ")[7];
    time = events[i].split(" ")[4];
    if(currentAction === "Guard"){

      if(i !== 0){
        //ends the guard shift, add his sleep time to map.
        myMap.set(currentGuardId, currentSleepShift);
      }

      //new guard id
      currentGuardId = events[i].split(" ")[8];

      //is it the first time we see him?
      if(myMap.has(currentGuardId)){
        currentSleepShift = myMap.get(currentGuardId);
      }else{
        currentSleepShift = new SleepShift();
      }
    }
    else if(currentAction === "wakes"){
      currentSleepShift.addEnd(time);
    }
    else if(currentAction === "falls"){
      currentSleepShift.addStart(time);
    }
  }

  function calculateSleepTime(value, key, map) {
    value.calculateTotalSleep();
  }
  myMap.forEach(calculateSleepTime);

  let laziestGuardId = "";
  let longestSleepTime = 0;

  function findTheLaziestGuard(value, key, map) {
    if(value.getTotalSleep() > longestSleepTime){
      longestSleepTime = value.getTotalSleep();
      laziestGuardId = key;
    }
  }
  myMap.forEach(findTheLaziestGuard);

  laziestGuard = myMap.get(laziestGuardId);

  getMostSleptMinute = (guard) => {
    minutes = [];
    for(let i = 0; i < guard.start.length; i++){
      sTime = parseInt(guard.start[i].split(":")[1]);
      eTime = parseInt(guard.end[i].split(":")[1]);

      for(let min = sTime; min < eTime; min++){
        minutes.push(min);
      }
    }
    minutes.sort(function(a, b) {
      return a - b;
    });

    let currentMin;
    let currentSize;
    let maxMin;
    let maxSize = 0;
    for(let i = 0 ; i < minutes.length; i++){
      if(i === 0){
        currentMin = minutes[i];
        maxMin = minutes[i];
        currentSize = 1;
      }else{
        if(minutes[i] === currentMin){
          currentSize++;
        }
        if(minutes[i] !== currentMin){
          if(currentSize > maxSize){
            maxSize = currentSize;
            maxMin = currentMin;
            currentSize = 1;
            currentMin = minutes[i];
          }else{
            currentMin = minutes[i];
            currentSize = 1;
          }
        }
      }
    }
    console.log( laziestGuardId.slice(1,6).toString() + " * " +maxMin.toString() + " = " + (laziestGuardId.slice(1,6)*maxMin).toString())
  //   const util = require('util')
    // console.log(util.inspect(events, { maxArrayLength: null }))
  }
  getMostSleptMinute(laziestGuard);
}


part1();
