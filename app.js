
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




var five = require("johnny-five"),
  board, button;

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(2);
  var led = new five.Led(12);


  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
    led.on();
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
    led.off();
  });
});

console.log("\nWaiting for device to connect....");
