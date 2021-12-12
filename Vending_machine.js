const fs = require('fs');
const reader = require('readline-sync');
const utils = require('./utils.js');
const jsonFile = './items.json';
const acceptable = utils.arrSort([50, 100, 200, 500]);

fs.readFile(jsonFile, 'utf8', function (err, data) {
    if(err !== null){
        console.log(`Something went wrong`);
        return false;
    }

    data = JSON.parse(data);

    utils.printItems(data);

    getItem(data);

})

function getItem(data){
    const index = reader.question('Please tell us the number of your desired item: ');
    
    if(!utils.checkAvailability(index, data)){
        console.log(`Item is not available, please select a valid item`);
        return getItem(data);
    }

    console.log(`The price of selected item is ${data[index].price}AMD`);
    return getCoins(index, data);
}

function getCoins(index, data){
    let sum = 0,
    item = data[index], 
    price = item.price;

    while(sum < price){
        const coin = +reader.question(`Please enter coins (acceptable amounts: ${acceptable.join(', ')}):`);
        if(acceptable.includes(coin)){
            sum += coin;
        }else{
            console.log(`The coin you entered is not accaptable`);
        }
    }
   
    let toReturn = utils.returnCoins(sum - price, acceptable);
    
    console.log(`Item returned: ${item.name}, coins returned: ${(!toReturn.length) ? 0 : toReturn.join(', ')}`);

    updateItems(index, data);

    console.log(`Please take your item ${item.name} and change ${sum-price}AMD` )
}

function updateItems(index, data){
    data[index].availability--;
    fs.writeFile(jsonFile, JSON.stringify(data), function(err){
        if(err !== null){
            console.log(`Something went wrong`);
        }
    });
}