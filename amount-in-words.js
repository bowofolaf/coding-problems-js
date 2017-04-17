/*
* linkedIn onsite interview question. Coding and Algorithms for JavaScript
* write a function to print out any real dollar amount( with cents)
* in words, as in a check.
* up to 999,999,999,999
*/
function inWords(amount){
    let result = '';
    let multiplier = 1;
    let map = getNumberWordMap();
    let and = false;
    let comma = false;

    let number = Math.floor(amount);
    let decimal = (amount % 1)  * 100;
    if(decimal) decimal = Number.parseInt(decimal);
    let suffix = number === 1 ? 'dollar': 'dollars';

    let decimalString = '';
    if(decimal) {
        console.log(threeDigitNumberToWords(decimal, map));
        decimalString = threeDigitNumberToWords(decimal, map);
        decimalString += decimal === 1 ? ' cent': ' cents';
    }

    do {
        let numberChunk = number % 1000;
        if(numberChunk){
            let numberChunkString = threeDigitNumberToWords(numberChunk, map);
            if(multiplier > 1) numberChunkString += ` ${map[multiplier]}`;
            if(and) numberChunkString += ' and';
            if(comma) numberChunkString += ',';
            result = `${numberChunkString} ${result}`;
        }
        

        and = numberChunk < 100 && numberChunk > 0;
        comma = numberChunk >= 100;
        
        number = (number - numberChunk)/1000;
        multiplier*= 1000;
    }
    while(number)
    
    result += suffix;

    if(decimalString) {
        result = `${result} and ${decimalString}`;
    }

    return `${result}.`;
}

function threeDigitNumberToWords(number, map) {
    if(number > 999) return 'i handle 0 - 999 only thx'

    var result = '';
    let unitTen = number % 100;
    let unit = unitTen % 10;

    // 1- 19 or multiple of 10 (unit == 0)
    if (unitTen < 20 || !unit) {
        result += map[unitTen];
    }
    else {
        result += `${map[unitTen-unit]}-${map[unit]}`;
    }

    let hundred = (number - unitTen)/100;
    if (hundred) {
       if (result) {
           result = `${map[hundred]} hundred and ${result}`;
       }
       else {
           result = `${map[hundred]} hundred`; 
       }
    }

    return result;
}

function getNumberWordMap() {
    return {
        0: '',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety',
        1000: 'thousand',
        1000000: 'million',
        1000000000: 'billion'
    };
}
