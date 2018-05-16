'use strict';

// ====================================
// Some global variables
// ====================================

// some HTML ids we will need
// p#progress shows text like "You have done 'x' tests out of 25"
// ul#results is inside the aside for results later.
// div#vote-box is container of form, image selection, and vote button
// form#preference for our form input
// input name="favorite" with radio options r0, r1, r2
// img#opt0, img#opt1, img#opt2 are the 3 comparison images inside div#vote-box

var ctx = document.getElementById('myChart').getContext('2d'); 
var dataChart; 
var titles = []; // used for labels in charts.js
var clicks = []; // used for clickCount data in charts.js
var shown = [];  // used for shownCount data in charts.js
var chartDrawn = false; 

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
// var liEl = document.getElementById('item1'); // currently not used, but still an option in HTML

var testCount = 0;
var productList = []; // Constructor will push each product object instance to this list

// ====================================
// ==== Object Constructor Function ===
// ====================================

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.shownCount = 0;
  this.clickCount = 0;
  productList.push(this);
} // end Product Object constructor function

// === Some Object Methods ===
// hmm, perhaps none. 

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

function makeCurrentTest() { // works with an array of previously used products
  if(notAllowed.length === 0) { // so this is the first display of a test set.
    notAllowed = [productList.length + 1]; // maybe could be productList.length, I think.
  }
  // select a random object from our productList array
  // add this object to notAllowed & currentCompare arrays
  for(var j = 0; j < 3; j++) { // currently assuming comparing 3 items each test
    do {  // much of this can be replaced with array.includes or array.indexOf
      currentCompare[j] = randomProduct(); 
      var allowedFlag = true;
      // console.log('item ' + j + ' selected: ' + currentCompare[j]);
      for(var i = 0; i < notAllowed.length; i++) {
        // console.log('does ' + currentCompare[j] + ' equal ' + notAllowed[i]);
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
  currentCompare = [];
} // end function prepNextTest

function renderProgress() {
  pElProgress.textContent = 'You have completed ' + testCount + ' out of ' + batteryLength + '.'; 
  // in here we could put some words of encouragement or cute stuff as we go along. 
} // end function renderProgress

function makeResults() { // this will be a list of text of the data.
  // ul#results is inside the aside for results
  var ulEl = document.getElementById('results'); 
  for(var i in productList) {
    var liEl = document.createElement('li');
    liEl.textContent = '' + productList[i].name + ': ' + productList[i].clickCount + ' out of ' + productList[i].shownCount + '.'; 
    ulEl.appendChild(liEl);
  }
} // end makeResults

function renderCharts() {
  // var ctx set as global variable
  // unhide the chart 

  // need data array(s) to pass to charts.js
  for(var i in productList) { // set the arrays to be easier to use chart.js
    titles[i] = productList[i].name; 
    clicks[i] = productList[i].clickCount; 
    shown[i] = productList[i].shownCount; 
  }

  var data = {
    labels: titles, // titles array we declared earlier
    datasets: [{
      data: clicks, // clickCount array we declared earlier
      backgroundColor: [
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy',
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'navy'        
      ],
      hoverBackgroundColor: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple'                        
      ]
    }]
  }; // end literal object declaration data; 

  dataChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;

} // end renderCharts

// ===================
// Event functions / handlers.
// ===================

function handleSubmit(e) {
  e.preventDefault(); // otherwise we get a page refresh on form
  var fav = e.target.favorite.value; // this is the one they selected.
  // increment the click counter for the product selected
  productList[fav].clickCount ++;
  // increment the shown counter for all displayed products
  for(var i in currentCompare) {
    productList[currentCompare[i]].shownCount ++;
    // console.log(productList[currentCompare[i]].name + ' shown: ' + productList[currentCompare[i]].shownCount); 
  }
  // console.log('current set of this test: ' + currentCompare);
  testCount++;
  // console.log('tests completed: ' + testCount);
  if(testCount < batteryLength) {
    renderProgress(); 
    prepNextTest(); 
    makeCurrentTest(); 
  } else {
    // makeResults(); 
    renderCharts(); // renderCharts() is prettier than the list of makeResults()
    if(chartDrawn) { 
      dataChart.update();
    }
    // hide some elements we don't need to see or interact with. 
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
