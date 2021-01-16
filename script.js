'use strict';

let sq=0, ru=0, pus=0
let power=100

function addsquat(){
  ++sq
 // console.log('squat',sq)
  updatesquat()
}

function addrun(){
  ++ru
//  console.log('run',ru/10,'km')
updaterun()
}

function addpushup(){
  ++pus
//  console.log('push',pus)
  updatepushup()
}



function updatesquat(){
    document.getElementById('squatdone').innerHTML=sq
}
function updatepushup(){
  document.getElementById('pushupdone').innerHTML=pus
}
function updaterun(){
  document.getElementById('runned').innerHTML=ru/10
}





//// push up
var pushupIsClicked = false; // declare the variable that tracks the state
function clickHandler_pushup(){ // declare a function that updates the state
  pushupIsClicked = true;
  if(power>0){
  addpushup()
  power--
  powerupdate()
}
}
var elementpushup = document.getElementById('pushup'); // grab a reference to your element
elementpushup.addEventListener('click', clickHandler_pushup); 



////squat
var squatIsClicked = false; 
function clickHandler_squat(){ 
  squatIsClicked = true;
  if(power>0){
  addsquat()
  power--,power--
  powerupdate()
}
}
var elementsquat = document.getElementById('squat');
elementsquat.addEventListener('click', clickHandler_squat); 


//////////////run
var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
  if(mousedownID==-1)  //Prevent multimple loops!
     mousedownID = setInterval(whilemousedown, 250 /*execute every 300ms*/);


}
function mouseup(event) {
   if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
   }

}

function whilemousedown() {
    if(power>0){
  addrun()
  power--
  power--
  power--
  power--


  powerupdate()}
   /*here put your code*/
}
//Assign events
var run = document.getElementById('Run');
run.addEventListener("mousedown", mousedown);
run.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
run.addEventListener("mouseout", mouseup);



////



function powerupdate(){
  console.log('power', power)
  //++power
  document.getElementById('powercurrent').innerHTML=Math.floor(power)
  document.getElementById('powermax').innerHTML=Math.floor(powerstart)


  if(power<=0){
    document.getElementById('zeropower').innerHTML='You are totally tired and need go to sleep!'

  }

}

let powerstart=100


var sleepIsClicked = false; 
function clickHandler_sleep(){ 

  let powerdif=powerstart-power
  sleepIsClicked = true;
  //console.log('power', power)
 console.log('powerdif', powerdif)
  power_start_count(powerdif)
  //console.log(powerstart)


  if(power+(powerstart*0.25)<powerstart){
        power=power+(powerstart*0.25)
}
  else{power=powerstart}


  powerupdate()


  statsupdate()

  if(powerdif<=0 && powerstart>71){
  powerstart=powerstart*0.98
}

  else if(powerdif<=0 && powerstart<71 && powerstart>51){
  powerstart=powerstart*0.99
}
  document.getElementById('zeropower').innerHTML=''

  return powerstart
  
}
var elementsleep = document.getElementById('sleep');
elementsleep.addEventListener('click', clickHandler_sleep); 



function power_start_count(powerdif){
  powerstart=powerstart+powerdif*0.03
}

let day=1, totalsquat=0, totalpushup=0, totalrun=0

function statsupdate(){
  ++day
  totalsquat+=sq
  totalpushup+=pus
  totalrun+=(ru/10)

  document.getElementById('day').innerHTML=day
  document.getElementById('totalsquat').innerHTML=totalsquat
  document.getElementById('totalpushup').innerHTML=totalpushup
  document.getElementById('totalrun').innerHTML=totalrun.toFixed(1)

  sq=0
  pus=0
  ru=0

  updatesquat()
  updatepushup()
  updaterun()
}

function godmode(){
  power+=1000
  powerstart+=1000
}
//godmode() 

function endlessWorkout(){
  if(power>0){
  setTimeout(clickHandler_squat,0)
  setTimeout(clickHandler_pushup,0)
  setTimeout(whilemousedown,0)
  setTimeout(whilemousedown,0)
  setTimeout(whilemousedown,0)
  setTimeout(whilemousedown,0)

  }
  if(power<=0){
    while(power<powerstart){
    clickHandler_sleep()}
  }
}


var auto;
document.getElementById('endless-button').addEventListener('change', function() {
    if(this.checked) {
        auto = setInterval(endlessWorkout,50);
    }
    else{
        console.log("setInterval Cleared");
        auto = clearInterval(auto);
    }
})

