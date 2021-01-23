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



function getProductArray(nameOfThePropertyIWant){
    var answer = [];
    for(var i = 0; i < productContainer.length; i++){
      answer[i] = productContainer[i][nameOfThePropertyIWant];
    }
    return answer;
}
function makePercentageArray() {
    var answer = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].displayCount > 0){
            answer[i] = Math.round( (productContainer[i]['clickCount'] / productContainer[i]['displayCount']).toFixed(2) * 100);
            console.log(answer[i]);
        } else {
            answer[i] = 0;
        }
    }
    return answer;
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
displayResults();
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