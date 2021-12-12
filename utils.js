module.exports = {
    printItems,
    checkAvailability,
    arrSort,
    returnCoins
}


function printItems(data){
    for(let i = 0; i < data.length; i++){
        console.log(`#${i} ${data[i].name} (${data[i].availability || `Not Available`}) - ${data[i].price}AMD`)
    }
}

function checkAvailability(item, data){
    return data[item] && data[item].availability;
}

function returnCoins(coin, accaptable){
    let retCoins = [];
    for(let i = accaptable.length - 1; i >= 0 && coin > 0; i--){
        if(accaptable[i] <= coin) {
            retCoins.push(accaptable[i]);
            coin -= accaptable[i];
            i++;
        }
    }
    return retCoins;
}

function arrSort(arr){
    // arr.sort(function(a,b){return a-b});
    for(let i = 0; i<arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] > arr[j]){
                let a = arr[i];
                arr[i] = arr[j];
                arr[j] = a;
            }
        }
    }
    return arr;
}
