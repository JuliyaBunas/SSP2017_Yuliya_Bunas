'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {

    puzzle = puzzle.map(item => item.split(''));

    function dfs(currCoordinates, step) {
        let save = puzzle[currCoordinates.x][currCoordinates.y];
        puzzle[currCoordinates.x][currCoordinates.y] = "";

        if (step === (searchStr.length-1))
            return true;

        let result = false;
        let steps = [[1, 0], [-1, 0], [0, -1], [0, 1]];

        for (let i = 0; i < 4; i++) {
            let newX = currCoordinates.x + steps[i][0],
                newY = currCoordinates.y + steps[i][1];
            try {
                if (puzzle[newX][newY] === searchStr[step+1]) {
                    result = result || dfs({x: newX, y: newY}, step + 1);
                    if(result){
                        break;
                    }
                }
            }
            catch (e){}
        }

        puzzle[currCoordinates.x][currCoordinates.y] = save;
        return result;
    }

    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++)
            if (puzzle[i][j] === searchStr[0]) {
                if (dfs({x: i, y: j}, 0))
                    return true;
            }
    }

    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    /**
     * Heap's algorithm implementation
     * @param {Array} a
     * @param {number} n
     */
    function *permute(a, n) {
        if (n < 2)
            yield a.join('');
        else
            for (let i = 0; i < n; i++) {
                yield *permute(a, n - 1);
                const toSwap = n % 2 ? 0 : i;
                let temp = a[n - 1];
                a[n - 1] = a[toSwap];
                a[toSwap] = temp;
            }
    }
    yield *permute(chars.split(''), chars.length);
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profitArray = quotes.map((currentValue, index) =>
        (quotes.slice(index, quotes.length)
            .sort((a, b) => b - a)[0] - currentValue)
    );

    return profitArray.reduce((accum, value) => {return accum + value});
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        let result = "";

        for (let i = 0; i < url.length; i += 2) {
            let a = url.charCodeAt(i);
            let b = url.charCodeAt(i + 1);
            let code = (a << 8) | b;

            result += String.fromCharCode(code);
        }

        return result;
    },
    
    decode: function(code) {
        let result = "";

        for (let i = 0; i < code.length; i++) {
            let char = parseInt(code.charCodeAt(i), 10);
            let b = char & 255;
            let a = (char >> 8) & 255;

            if (b === 0) {
                result += String.fromCharCode(a)
            } else {
                result += String.fromCharCode(a) + String.fromCharCode(b);
            }
        }

        return result;
    }
};


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};