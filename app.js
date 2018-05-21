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
var shown = []; // used for shownCount data in charts.js
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
// Perhaps none.

// === Create Known Object Instances ===
// Our given Input Data, used if user is visiting for the first time. 
var deployUrl = 'https://chrisseattle.github.io/bus-mall';
var nameImg = [ 
  ['bag', '/img/bag.jpg'],
  ['banana', '/img/banana.jpg'],
  ['bathroom', '/img/bathroom.jpg'],
  ['boots', '/img/boots.jpg'],
  ['breakfast', '/img/breakfast.jpg'],
  ['bubblegum', '/img/bubblegum.jpg'],
  ['chair', '/img/chair.jpg'],
  ['cthulhu', '/img/cthulhu.jpg'],
  ['dogduck', '/img/dog-duck.jpg'],
  ['dragon', '/img/dragon.jpg'],
  ['pen', '/img/pen.jpg'],
  ['petsweep', '/img/pet-sweep.jpg'],
  ['scissors', '/img/scissors.jpg'],
  ['shark', '/img/shark.jpg'],
  ['sweep', '/img/sweep.png'],
  ['tauntaun', '/img/tauntaun.jpg'],
  ['unicorn', '/img/unicorn.jpg'],
  ['usb', '/img/usb.gif'],
  ['watercan', '/img/water-can.jpg'],
  ['wineglass', '/img/wine-glass.jpg']
]; 

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
  // choose0.checked = false;
  img1.setAttribute('src', productList[compareArray[1]].filepath);
  choose1.setAttribute('value', compareArray[1]);
  // choose1.checked = false;
  img2.setAttribute('src', productList[compareArray[2]].filepath);
  choose2.setAttribute('value', compareArray[2]);
  // choose2.checked = false;
} // end function renderThree

// ===================
// Main Functions
// ===================

function getProductList() {
  if (localStorage.busProductData) {
    console.log('localStorage exists');
    productList = JSON.parse(localStorage.getItem('busProductData'));
  } else {
    console.log('no localStorage. Starting from scratch.');
    for(var i in nameImg) {
      var currentUrl = '' + deployUrl + nameImg[i][1]; 
      new Product(nameImg[i][0], currentUrl);
    }
  }
} // end getProductList

function makeCurrentTest() { 
  if(notAllowed.length === 0) { // so this is the first display of a test set.
    notAllowed = [productList.length + 1]; 
  }
  // select a random object from our productList array
  // add this object to notAllowed & currentCompare arrays
  for(var j = 0; j < 3; j++) { // currently assuming comparing 3 items each test
    do {
      currentCompare[j] = randomProduct();
    } while(notAllowed.includes(currentCompare[j]));
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
  // ctx variable is already set as global variable
  // unhide the chart if it is hidden. 
  document.getElementById('myChart').style.display = 'block';

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
        'bisque', 'darkgray', 'burlywood', 'lightblue', 'navy',
        'bisque', 'darkgray', 'burlywood', 'lightblue', 'navy',
        'bisque', 'darkgray', 'burlywood', 'lightblue', 'navy',
        'bisque', 'darkgray', 'burlywood', 'lightblue', 'navy'
      ],
      borderColor: [ 
        'black', 'black', 'black', 'black', 'black', 
        'blue', 'blue', 'blue', 'blue', 'blue', 
        'grey', 'grey', 'grey', 'grey', 'grey', 
        'purple', 'purple', 'purple', 'purple', 'purple'
      ],
      borderWidth: 1, 
      hoverBackgroundColor: [
        'purple', 'purple', 'purple', 'purple', 'purple', 
        'purple', 'purple', 'purple', 'purple', 'purple', 
        'purple', 'purple', 'purple', 'purple', 'purple', 
        'purple', 'purple', 'purple', 'purple', 'purple'
      ]
    }]
  }; // end literal object declaration data;

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: { 
        yAxes: [{ 
          ticks: {  
            suggestedMax: 10,
            beginAtZero:true
          }
        }]
      }
    }
  });

  chartDrawn = true;
} // end renderCharts

function saveTestBattery() {
  localStorage.setItem('busProductData', JSON.stringify(productList));
} // end function saveTestBattery

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
  }
  testCount++;
  if(testCount < batteryLength) {
    renderProgress();
    prepNextTest();
    makeCurrentTest();
  } else {
    // makeResults();
    renderCharts(); // renderCharts() is prettier than the list of makeResults()
    saveTestBattery(); 

    // hide some elements we don't need to see or interact with.
    voted.style.display = 'none';
    pElProgress.style.display = 'none';
    // turn off event listeners? Or not needed with the elements hidden? 
  }
} // end function handleSubmit

// ====================================
// On page load, do the following
// ====================================

getProductList(); 
makeCurrentTest();

// ====================================
// Event Listners
// ====================================

voted.addEventListener('submit', handleSubmit);