'use strict';
console.log('js script connected');

var imgElements = document.getElementsByTagName('img');
var productContainer = [];
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;
//page loads and sets the all click counter to zero no matter what
var allClickCount = 0;
//but then it adjusts the variable to load the totalClicks item from memory.  if clicks have been registered before a refresh they stay.
var allClickCount = localStorage.getItem('totalClicks');
var amtTests = 25;

function Product(name, imageLink, clickCount) {
    this.name = name;
    this.imageLink = imageLink;
    if (clickCount) {
        this.clickCount = clickCount;
    } else {
        this.clickCount = 0;
    }
    this.displayCount = 0;
    productContainer.push(this);
}


function ObjectLoader() {
    var savedProduct = localStorage.getItem('savedProducts');
    if (savedProduct) {
        console.log('loading saved array of objects');
        var arrayOfNotObjects = JSON.parse(savedProduct);
        for (var i = 0; i < arrayOfNotObjects.length; i++) {
            new Product(arrayOfNotObjects[i].name,
                arrayOfNotObjects[i].imageLink,
                arrayOfNotObjects[i].clickCount
                );
        }
    } else {
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
    }
}

//ObjectLoader function runs when the script reaches this point. This means that it will run
//AFTER a page refresh as the script will run again and reach this point. In the function's logic, if
//anything exists in localStorage regarding that JSONified Object string, instead of creating all new objects when
//the page loads, it will load the objects from local storage. 
ObjectLoader();

console.log('objects loaded');
function onClickHandler(event) {
    console.log('onclick registered'); 
    allClickCount++;
    localStorage.setItem('totalClicks', allClickCount);
    console.log(allClickCount);
    //if one of the elements is clicked, the counter variable will be incremented based on the id
    if(event.srcElement.id === '1') {
        productContainer[productIndex1].clickCount++;
        console.log('product 1 clicked, its clickCount is: ' + productContainer[productIndex1].clickCount);
    } else if (event.srcElement.id === '2') {
        productContainer[productIndex2].clickCount++;
        console.log('product 2 clicked, its clickCount is: ' + productContainer[productIndex2].clickCount);
    } else if (event.srcElement.id === '3') {
        productContainer[productIndex3].clickCount++;
        console.log('product 3 clicked, its clickCount is: ' + productContainer[productIndex3].clickCount);
    }
    //after recording the result, the deck should be shuffled so to speak, but it will keep running the RNG until it picks something new
    //we also must make sure there are no duplicates, so shuffle 2 and three will have another condition to make sure they do not match shuffle1 or each other
    var shuffle1 = Math.floor(Math.random() * productContainer.length);
    while(shuffle1 === productIndex1 || shuffle1 === productIndex2 || shuffle1 === productIndex3) {
        shuffle1 = Math.floor(Math.random() * productContainer.length);
    }
    var shuffle2 = Math.floor(Math.random() * productContainer.length);
    while(shuffle2 === productIndex1 || shuffle2 === productIndex2 || shuffle2 === productIndex3 || shuffle2 === shuffle1) {
        shuffle2 = Math.floor(Math.random() * productContainer.length);
    }
    var shuffle3 = Math.floor(Math.random() * productContainer.length);
    while(shuffle3 === productIndex1 || shuffle3 === productIndex2 || shuffle3 === productIndex3 || shuffle3 == shuffle1 || shuffle3 == shuffle2) {
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
    console.log('should be incrementing displayCounts, vars are: '+productContainer[productIndex1].displayCount+' '+productContainer[productIndex2].displayCount+' '+productContainer[productIndex1].displayCount);
    //save the object group after EVERY click -->
    localStorage.setItem('savedProducts', JSON.stringify(productContainer));
    //if we finished the whole test session run a function that displays the results -- as per submission instructions we also remove the event listeners here
    if (allClickCount >= amtTests) {
        //this grabs our Product objects that were constructed and pushed to an array and converts them into a string format
        
        for (var i = 0; i < imgElements.length; i++) {
            imgElements[i].removeEventListener('click', onClickHandler);
        }
        var resultButton = document.createElement('button');
        resultButton.innerHTML = "Click for Results On New Page";
        //below causes the button to go to a new page
        resultButton.onclick = function ()  {
            location.href = "/results.html"
        };
        //below line targets a div on the html page that exists as a placeholder
        var resultPanel = document.getElementById('button-spot');
        resultPanel.appendChild(resultButton);
        // resultButton.addEventListener('click', displayResults);
        //display results is the function that creates the list items and appends to a ul

    }
}
 

//make the event listeners active
imgElements[0].addEventListener('click', onClickHandler);
imgElements[1].addEventListener('click', onClickHandler);
imgElements[2].addEventListener('click', onClickHandler);


//working with the form

var nameForm = document.getElementById('name-form');

nameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('name form is listening');
    var userNameProvided = document.getElementById('name').value;
    console.log('userNameProvided', userNameProvided);
    //save it to local storage
    localStorage.setItem('userName', userNameProvided);
    //show it on the page
    nameForm.textContent = 'Welcome to our site ' + userNameProvided;

});
//remove the form
var savedName = localStorage.getItem('userName');
if (savedName) {
    nameForm.textContent = `Thanks for stopping by ${savedName}.  Your participation is key to our results!`;
}
