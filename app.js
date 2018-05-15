'use strict';

// ===================================
// currently most of the functions are dealing with index numbers
// but not actually passing or holding the objects. Maybe should change
// ====================================


// ====================================
// Some global variables
// ====================================

// some HTML ids we will need
// p#progress shows text like "You have done 'x' tests out of 25"
// ul#results is inside the aside for results later.
// 
// div#vote-box is container of form, image selection, and vote button
// form#preference for our form input
// input name="favorite" with radio options r0, r1, r2
//
// img#opt0, img#opt1, img#opt2 are the 3 comparison images inside div#vote-box
//

var batteryLength = 25; 
var compareCount = 3; // original plan for how many to compare at each test.
var compareThem = []; // an array for however many we will compare at one time.

var currentCompare = []; // these are the selected objects for our current test.
var notAllowed = []; // will store objects shown last time and selected for this time since neither are allowed to duplicate this time.

var voted = document.getElementById('preference');
var pElProgress = document.getElementById('progress');
var choose0 = document.getElementById('r0');
var choose1 = document.getElementById('r1');
var choose2 = document.getElementById('r2');
var img0 = document.getElementById('opt0');
var img1 = document.getElementById('opt1');
var img2 = document.getElementById('opt2');


// var testBattery = [];
// var liEl = document.getElementById('item1');

var testCount = 0;
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
  img0.setAttribute('src', productList[compareArray[0]].filepath);
  choose0.setAttribute('value', compareArray[0]);
  choose0.checked = false;
  img1.setAttribute('src', productList[compareArray[1]].filepath);
  choose1.setAttribute('value', compareArray[1]);
  choose1.checked = false;
  img2.setAttribute('src', productList[compareArray[2]].filepath);
  choose2.setAttribute('value', compareArray[2]);
  choose2.checked = false;
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

function renderProgress() {
  pElProgress.textContent = 'You have completed ' + testCount + ' out of ' + batteryLength + '.'; 
}
function makeResults() {
  // ul#results is inside the aside for results.
  var ulEl = document.getElementById('results'); 
  for(var i in productList) {
    var liEl = document.createElement('li');
    liEl.textContent = '' + productList[i].name + ': ' + productList[i].clickCount + ' out of ' + productList[i].shownCount + '.'; 
    ulEl.appendChild(liEl);
  }
} // end makeResults

// ===================
// Event functions / handlers.
// ===================

function handleSubmit(e) {
  e.preventDefault(); // otherwise we get a page refresh on form
  var fav = e.target.favorite.value; // this is the one they selected.
  // increment the click counter for the product selected
  productList[fav].clickCount ++;
  console.log(fav);
  // increment the shown counter for all displayed products
  for(var i in currentCompare) {
    productList[currentCompare[i]].shownCount ++;
    console.log(productList[currentCompare[i]].name + ' shown: ' + productList[currentCompare[i]].shownCount); 
  }
  console.log('current set of this test: ' + currentCompare);
  // testBattery.push = currentCompare;
  // console.log('all test sets for this battery of tests: ' + testBattery);
  testCount++;
  console.log('tests completed: ' + testCount);
  if(testCount < batteryLength) {
    renderProgress(); 
    prepNextTest(); 
    makeCurrentTest(); 
  } else {
    makeResults(); 
    voted.style.display = 'none'; 
    pElProgress.style.display = 'none';
  }
}
// ====================================
// On page load, do the following
// ====================================


makeCurrentTest();


// ====================================
// Event Listners
// ====================================

voted.addEventListener('submit', handleSubmit);
