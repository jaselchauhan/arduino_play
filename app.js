/*
//hello world app for arduino using johnny-five and node.js
// var five = require('johnny-five');
// var board = new five.Board();
// var led = null
// var toggleState = false


// board.on('ready', function(){
//   console.log("Board ready");
//   led = new five.Led(13);
//
//
// setInterval(toggleLED, 2000);
//
//   function toggleLED() {
//     toggleState = !toggleState;
//
//     if(toggleState){
//       led.on();
//       console.log("led on");
//     } else {
//       led.off();
//       console.log("led off");
//     }
//   }
//
// });

*/

//setup variables
var five = require("johnny-five")
var board = new five.Board();
var button = new five.Button(2);
var led = new five.Led(12);
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://fireplay.firebaseio-demo.com/button");

//event listener for when arduino is ready
board.on("ready", function() {


  // when button is pressed
  button.on("down", function() {
    console.log("down");
    led.on();
    myFirebaseRef.set("down");
  });

  // when button is released
  button.on("up", function() {
    console.log("up");
    led.off();
    myFirebaseRef.set("up");
  });

  // setup firebase to read so you can control button from net
  myFirebaseRef.on("value", function(snapshot) {
  var buttonState = snapshot.val();

  if(buttonState == "down"){
    led.on();
  } else {
    led.off();
  }

});

});

console.log("\nWaiting for device to connect....");
