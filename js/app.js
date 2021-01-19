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

function getProductArray(nameOfProperty) {
    var answer = [];
    for (var i = 0; i < productContainer.length; i++) {
        answer[i] = productContainer[i][nameOfProperty];
    }
    return answer;
}
function makePercentageArray() {
    var answer = [];
    for (var i = 0; i < productContainer.length; i++) {
        answer[i] = ((productContainer[i].clickCount / productContainer[i].displayCount) * 100).toFixed(2);
    }
    return answer
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
    if(event.srcElement.id === '1') {
        productContainer[productIndex1].clickCount++;
    } else if (event.srcElement.id === '2') {
        productContainer[productIndex2].clickCount++;
    } else if (event.srcElement.id === '3') {
        productContainer[productIndex3].clickCount++;
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
    //if we finished the whole test session run a function that displays the results -- as per submission instructions we also remove the event listeners here
    if (allClickCount === amtTests) {
        for (var i = 0; i < imgElements.length; i++) {
            imgElements[i].removeEventListener('click', onClickHandler);
        }
        var resultButton = document.createElement('button');
        resultButton.innerHTML = "Click for Results";
        //below line targets a div on the html page that exists as a placeholder
        var resultPanel = document.getElementById('button-spot');
        resultPanel.appendChild(resultButton);
        resultButton.addEventListener('click', displayResults);
        //display results is the function that creates the list items and appends to a ul

    }
}
 
function displayResults() {
    var resultList = document.getElementById('result-list');
    for (var i = 0; i < productContainer.length; i++) {
        var newListItem = document.createElement('li');
        newListItem.textContent = `${productContainer[i].name} was clicked on ${productContainer[i].clickCount} times, and was shown ${productContainer[i].displayCount} times.`;
        resultList.appendChild(newListItem);
        var percentageListItem = document.createElement('li');
        if(productContainer[i].displayCount === 0) {
            var math = `ZERO clicks and shown ${productContainer[i].displayCount} times.`;
        } else {
            math = Math.round( (productContainer[i]['clickCount'] / productContainer[i]['displayCount']).toFixed(2) * 100) + '%';      
        }
        percentageListItem.textContent = `${productContainer[i].name} percentage of clicks was` + math;
        productContainer[i].percentage = math;
        console.log(productContainer[i].name + '% is ' + productContainer[i].percentage)
        resultList.appendChild(percentageListItem);
    }
    var message1 = document.getElementById('msg1');
    message1.innerHTML = 'Total Clicks Per Product';
    var message2 = document.getElementById('msg2');
    message2.innerHTML = 'Percentage Of Times CLicked Out Of Times Shown';
    runMyTotalClickChart();
    runMyPercentageChart();
}

//make the event listeners active
imgElements[0].addEventListener('click', onClickHandler);
imgElements[1].addEventListener('click', onClickHandler);
imgElements[2].addEventListener('click', onClickHandler);

function runMyTotalClickChart () {
    var ctx = document.getElementById('myChartTotalClicks').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: getProductArray('name'),
            datasets: [{
                label: 'Number of Clicks per Product',
                data: getProductArray('clickCount'),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function runMyPercentageChart () {
    var ctx = document.getElementById('myChartPercentage').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: getProductArray('name'),
            datasets: [{
                label: 'Percentage of Clicks per Times Seen',
                data: makePercentageArray(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
