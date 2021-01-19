'use strict'
console.log('js script connected');

var imgElements = document.getElementsByTagName('img');
var productContainer = [];
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;
var allClickCount = 0;
var amtTests = 25;

function Product(name, imageLink) {
    this.name = name;
    this.imageLink = imageLink;
    this.clickCount = 0;
    this.displayCount = 0;
    productContainer.push(this);
}

new Product('Banana Slicer','img/banana.jpg');
new Product('TP Tablet Holder', 'img/bathroom.jpg');
new Product('Rain Boots', 'img/boots.jpg');
new Product('Complete Breakfast', 'img/breakfast.jpg');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
new Product('Uncomfortable Chair', 'img/chair.jpg');
new Product('Cthulhu Figurine', 'img/cthulhu.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Pen Tableware','img/pen.jpg');
new Product('Pet Paw Sweeper', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Plush', 'img/shark.jpg');
new Product('Baby Sweeper', 'img/sweep.png');
new Product('Tauntaun Sleeper', 'img/tauntaun.jpg');
new Product('USB Tentacle', 'img/usb.gif');
new Product('Self Watering Watering Can', 'img/water-can.jpg');
new Product('Dribble-sure Wine Glass', 'img/wine-glass.jpg');

//these three are automatically seen as the defaults during page load
productContainer[productIndex1].displayCount++;
productContainer[productIndex2].displayCount++;
productContainer[productIndex3].displayCount++;



function onClickHandler(event) {
    console.log('onclick registered');
    allClickCount++;
    console.log(allClickCount);
    //if one of the elements is clicked, the counter variable will be incremented based on the id
    if(event.srcElement.id === 'first') {
        productContainer[productIndex1].clickCount++;
    } else if (event.srcElement.id === 'second') {
        productContainer[productIndex2].clickCount++;
    } else if (event.srcElement.id === 'third') {
        productContainer[productIndex3].clickCount++;
    }
    //after recording the result, the deck should be shuffled so to speak, but it will keep running the RNG until it picks something new
    var shuffle1 = Math.floor(Math.random() * productContainer.length);
    while(shuffle1 === productIndex1 || shuffle1 === productIndex2 || shuffle1 === productIndex3) {
        shuffle1 = Math.floor(Math.random() * productContainer.length);
    }
    var shuffle2 = Math.floor(Math.random() * productContainer.length);
    while(shuffle2 === productIndex1 || shuffle2 === productIndex2 || shuffle2 === productIndex3) {
        shuffle2 = Math.floor(Math.random() * productContainer.length);
    }
    var shuffle3 = Math.floor(Math.random() * productContainer.length);
    while(shuffle3 === productIndex1 || shuffle3 === productIndex2 || shuffle3 === productIndex3) {
        shuffle3 = Math.floor(Math.random() * productContainer.length);
    }
    //now with three brand new index numbers the products can be updated
    productIndex1 = shuffle1;
    productIndex2 = shuffle2;
    productIndex3 = shuffle3;
    //the images for the new product indices can be displayed
    imgElements[0].src = productContainer[productIndex1].imageLink;
    imgElements[1].src = productContainer[productIndex2].imageLink;
    imgElements[2].src = productContainer[productIndex3].imageLink;
    //and the counter for the times displayed can be updated
    productContainer[productIndex1].displayCount++;
    productContainer[productIndex2].displayCount++;
    productContainer[productIndex3].displayCount++;
    //if we finished the whole test session run a function that displays the results -- as per submission instructions we also remove the event listeners here
    if (allClickCount === amtTests) {
        for (var i = 0; i < imgElements.length; i++) {
            imgElements[i].removeEventListener('click', onClickHandler);
        }
        displayResults();
    }
}
 
function displayResults() {
    var resultList = document.getElementById('result-list');
    for (var i = 0; i < productContainer.length; i++) {
        var newListItem = document.createElement('li');
        newListItem.textContent = productContainer[i].name + " had " + productContainer[i].clickCount + ' votes and was shown ' + productContainer[i].displayCount + " times.";
        resultList.appendChild(newListItem);
    }
}

//make the event listeners active
imgElements[0].addEventListener('click', onClickHandler);
imgElements[1].addEventListener('click', onClickHandler);
imgElements[2].addEventListener('click', onClickHandler);

displayResults()