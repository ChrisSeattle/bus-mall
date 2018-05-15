'use strict';

// ===================================
// currently most of the functions are dealing with index numbers
// but not actually passing or holding the objects. Maybe should change
// ====================================


// ====================================
// Some global variables
// ====================================

// some HTML ids we will need
// ul#results is inside the aside for results later.
// div#vote-box is container of form, image selection, and vote button
// form#preference for our form input
// input name="favorite" with radio options r1, r2, r3
//
// img#opt1, img#opt2, img#opt3 are the 3 comparison images inside div#vote-box
//

var compareCount = 3; // original plan for how many to compare at each test.
var compareThem = []; // an array for however many we will compare at one time.
// for(var i = 0; i < compareCount; i++) {
  // compareThem[i] = '';
// }

var currentCompare = []; // these are the selected objects for our current test.
var notAllowed = []; // will store objects shown last time and selected for this time since neither are allowed to duplicate this time.

var voted = document.getElementById('preference');
var choose1 = document.getElementById('r1');
var choose2 = document.getElementById('r2');
var choose3 = document.getElementById('r3');

var img1 = document.getElementById('opt1');
var img2 = document.getElementById('opt2');
var img3 = document.getElementById('opt3');

var liEl = document.getElementById('item1');

var productList = []; // Constructor will push each product object instance to this list

// ====================================
// ==== Object Constructor Function ===
// ====================================

function Product(name, filepath) {
  this.name = name;
  // this.idTag = idTag;
  this.filepath = filepath;
  this.shownCount = 0;
  this.clickCount = 0;
  productList.push(this);
} // end Product Object constructor function

// === Some Object Methods ===


// === Create Known Object Instances ===
// Our given Input Data
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
new Product('sweep', '/img/sweep.png');
new Product('tauntaun', '/img/tauntaun.jpg');
new Product('unicorn', '/img/unicorn.jpg');
new Product('usb', '/img/usb.gif');
new Product('watercan', '/img/water-can.jpg');
new Product('wineglass', '/img/wine-glass.jpg');

// ===================
// Helper Functions
// ===================

function randomProduct() {
  return Math.floor(Math.random() * productList.length);
}

function renderThree(compareArray) {
  // for now assume the array only has 3 items
  img1.setAttribute('src', productList[compareArray[0]].filepath);
  
  img2.setAttribute('src', productList[compareArray[1]].filepath);
  img3.setAttribute('src', productList[compareArray[2]].filepath);
} // end function renderThree

// ===================
// Main Functions
// ===================

// voted = document.getElementById('preference');
// choose1 = document.getElementById('r1');
// choose2 = document.getElementById('r2');
// choose3 = document.getElementById('r3');

function makeCurrentTest() { // takes in an array of previously used products
  if(notAllowed.length === 0) { // so this is the first display of a test set. 
    notAllowed = [productList.length + 1]; // could just be length I think. 
  }
  // select a random object from our productList array
  // add this object to notAllowed & currentCompare arrays
  for(var j = 0; j < 3; j++) { // currently assuming comparing 3 items each test 
    do {
      currentCompare[j] = randomProduct();
      var allowedFlag = true;
      console.log('item ' + j + ' selected: ' + currentCompare[j]);
      for(var i = 0; i < notAllowed.length; i++) {
        console.log('does ' + currentCompare[j] + ' equal ' + notAllowed[i]);
        if(currentCompare[j] === notAllowed[i]) {
          allowedFlag = false; 
        } 
      } // test if current item is in the not allowed list 
    } while(allowedFlag === false); 
    notAllowed.push(currentCompare[j]);
  } // we have selected 3 non-duplicate indexes that also don't match the passed array of notAllowed
  // Stretch: for each compareThem (which has compareCount number of items) make a list of allowed indexes. 

  // now that current currentCompare array is complete, send this to render
  renderThree(currentCompare); 
} // end function makeCurrentTest

function prepNextTest() {
  notAllowed = currentCompare.slice(0, currentCompare.length);
  // console.log('currently notAllowed has ' + notAllowed.length + ' items.'); 
  currentCompare = []; 
} // end function prepNextTest

// ===================
// Event functions / handlers.
// ===================

function handleSubmit(e) {
  e.preventDefault(); // otherwise we get a page refresh on form
  var fav = e.target.favorite.value; // this is the one they selected.

}
// ====================================
// On page load, do the following
// ====================================


makeCurrentTest(); 


// ====================================
// Event Listners
// ====================================

voted.addEventListener('submit', handleSubmit);

// Example with 'click' as Event Listner
// imgEl2.addEventListener('click', function() {
  // allPictures[picture2Index].clicked++;
  // chooseNewPictures();

