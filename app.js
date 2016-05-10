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




var five = require("johnny-five")
var board = new five.Board();
//cant set the button and led until the board is ready so keep as null here but define globally.
var button = null;
var led = null;

var Firebase = require("firebase");

board.on("ready", function() {

  button = new five.Button(2);
  led = new five.Led(12);

  //setup a new firebase
  var myFirebaseRef = new Firebase("https://fireplay.firebaseio-demo.com/button");

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
