'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates          *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math    *
 *                                                                                          *
 ********************************************************************************************/


function getRectangleArea(a,b){
    return a*b;
}
function getCicleCircumference(a){
   var circumference = 2*Math.PI*a;
   return circumference;
}
function getAverage(a,b){
    var x = (a+b)/2;
    if(x == Infinity){
        return Number.MAX_VALUE-1;
    }else return x;
}

function getDistanceBetweenPoints(a,b,c,d){
    return Math.sqrt(Math.pow((c-a),2)+Math.pow((d-b),2));
}

function getLinearEquationRoot(a,b){
    return (b*(-1))/a;   
}

function getAngleBetweenVectors(a,b,c,d){
    var x = a*c + b*d;
    var y = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    var z = Math.sqrt(Math.pow(c,2) + Math.pow(d,2));
    var cos = x/(y*z);
    var angle =Math.acos(cos);

    return angle;
}

function getLastDigit(a){
   return a%10; 
}

function parseNumberFromString(str){
    return parseFloat(str);
}

function getParallelipidedDiagonal(a,b,c){
    return Math.sqrt(Math.pow(a,2) + Math.pow(b,2) + Math.pow(c,2));
}

function roundToPowerOfTen(a, b) {
    return Math.round(a/Math.pow(10, b)) * Math.pow(10, b);
}

function isPrime(a){
    var flag = false;
    for(var i = 2; i <= Math.sqrt(a); i++) {
        if(a%i == 0) {
            flag = true;
            break;
        }
    }
    return !flag;
}

function toNumber(a,b){
    if(Number(a)){
        return a;
    }else{
        return b;
    }
}

module.exports = {
    getRectangleArea: getRectangleArea,
    getCicleCircumference: getCicleCircumference,
    getAverage: getAverage,
    getDistanceBetweenPoints: getDistanceBetweenPoints,
    getLinearEquationRoot: getLinearEquationRoot,
    getAngleBetweenVectors: getAngleBetweenVectors,
    getLastDigit: getLastDigit,
    parseNumberFromString: parseNumberFromString,
    getParallelipidedDiagonal: getParallelipidedDiagonal,
    roundToPowerOfTen: roundToPowerOfTen,
    isPrime: isPrime,
    toNumber: toNumber
};
