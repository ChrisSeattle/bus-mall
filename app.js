'use strict';

// ====================================
// Some global variables 
// ====================================

// some HTML ids we will need 
// div#vote-box is container of image selection and vote button
// img#opt1, img#opt2, img#opt3 are the 3 comparison images inside div#vote-box
// ul#results is inside the aside for results later. 

var img1 = document.getElementById('opt1'); 
var img2 = document.getElementById('opt2'); 
var img2 = document.getElementById('opt3'); 

var productList = []; // Constructor will push each product object instance to this list
// Our given Input Data 
  // ['bag', '/img/bag.jpg'],
  // ['banana', '/img/banana.jpg'],
  // ['bathroom', '/img/bathroom.jpg'],
  // ['boots', '/img/boots.jpg'],
  // ['breakfast', '/img/breakfast.jpg'],
  // ['bubblegum', '/img/bubblegum.jpg'],
  // ['chair', '/img/chair.jpg'],
  // ['cthulhu', '/img/cthulhu.jpg'],
  // ['dogduck', '/img/dog-duck.jpg'],
  // ['dragon', '/img/dragon.jpg'],
  // ['pen', '/img/pen.jpg'],
  // ['petsweep', '/img/pet-sweep.jpg'],
  // ['scissors', '/img/scissors.jpg'],
  // ['shark', '/img/shark.jpg'],
  // ['sweep', '/img/sweep.jpg'],
  // ['tauntaun', '/img/tauntaun.jpg'],
  // ['unicorn', '/img/unicorn.jpg'],
  // ['usb', '/img/usb.jpg'],
  // ['watercan', '/img/water-can.jpg'],
  // ['wineglass', '/img/wine-glass.jpg']


// ====================================
// ==== Object Constructor Function ===
function Product(name, filepath) {
  this.name = name; 
  // this.idTag = idTag; 
  this.filepath = filepath; 
  this.shownCount = 0; 
  this.clickCount = 0; 
  productList.push(this); 
} // end Product Object constructor function 

// === Some Object Methods ===

new Product('bag', '/img/bag.jpg');
new Product('banana', '/img/banana.jpg');
new Product('bathroom', '/img/bathroom.jpg'); 
new Product('boots', '/img/boots.jpg'); 
new Product('breakfast', '/img/breakfast.jpg'); 
new Product('bubblegum', '/img/bubblegum.jpg'); 
new Product('chair', '/img/chair.jpg'); 
new Product('cthulhu', '/img/cthulhu.jpg'); 
new Product('dogduck', '/img/dog-duck.jpg'); 
new Product('dragon', '/img/dragon.jpg'); 
new Product('pen', '/img/pen.jpg'); 
new Product('petsweep', '/img/pet-sweep.jpg'); 
new Product('scissors', '/img/scissors.jpg'); 
new Product('shark', '/img/shark.jpg'); 
new Product('sweep', '/img/sweep.jpg'); 
new Product('tauntaun', '/img/tauntaun.jpg'); 
new Product('unicorn', '/img/unicorn.jpg'); 
new Product('usb', '/img/usb.jpg'); 
new Product('watercan', '/img/water-can.jpg'); 
new Product('wineglass', '/img/wine-glass.jpg'); 

// === Create Known Object Instances ===

// ===================
// Helper Functions 
// ===================

// ====================================
// On page load, do the following
// ====================================


// ====================================
// Event Listners 
// ====================================

