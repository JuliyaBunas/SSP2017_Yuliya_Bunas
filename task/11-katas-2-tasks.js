'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let arr = bankAccount.split('\n');
    let accNum = 0;
    let numOfDigits = 9;
    for (let k = 0; k < numOfDigits; k++) {
        let digit;
        let i = k * 3;
        if(arr[2][i + 2] === ' ') {
            digit = 2;
        } else if(arr[1][i + 2] === ' ') {
            if (arr[2][i] === ' ') {
                digit = 5;
            } else {
                digit = 6;
            }
        }  else if(arr[2][i] === '|') {
            if (arr[1][i + 1] === ' ') {
                digit = 0;
            } else {
                digit = 8;
            }
        } else if(arr[0][i + 1] === ' ') {
            if (arr[1][i + 1] === ' ') {
                digit = 1;
            } else {
                digit = 4;
            }
        } else if(arr[1][i + 1] === '_') {
            if (arr[1][i] === '|') {
                digit = 9;
            } else {
                digit = 3;
            }
        } else {
            digit = 7;
        }
        accNum += digit * Math.pow(10, numOfDigits - k - 1);
    }
    return accNum;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let words = text.split(' ');
    let line = '';
    while (words.length) {
        if(line.length + words[0].length < columns) {
            line += line.length ? ' ' + words.shift() : words.shift();
        } else {
            yield line;
            line = '';
        }
    }
    yield line;
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};

let nums = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let signes = ['♣','♦','♥','♠'];

function getPokerHandRank(hand) {
    let cards = [];
    for (let card of hand) {
        cards.push(parseRank(card));
    }
    let signSame = isSignSame(cards);
    let straight = isStraight(cards);
    let freq = frequencyCounting(cards);

    if (signSame && straight)
        return PokerRank.StraightFlush;
    if (freq.four === 1)
        return PokerRank.FourOfKind;
    if (freq.three === 1 && freq.pairs === 1)
        return PokerRank.FullHouse;
    if (signSame)
        return PokerRank.Flush;
    if (straight)
        return PokerRank.Straight;
    if (freq.three === 1)
        return PokerRank.ThreeOfKind;
    if(freq.pairs === 2)
        return PokerRank.TwoPairs;
    if(freq.pairs === 1)
        return PokerRank.OnePair;
    else
        return PokerRank.HighCard;
}

/**
 *
 * @param {string} value
 * @returns {[number,number]}
 */
function parseRank(value){

    let num = value.slice(0,-1);
    let sign = value.slice(-1);
    let num_i = nums.indexOf(num);
    let sign_i = signes.indexOf(sign);
    return [num_i,sign_i];
}

/**
 *
 * @param {Array} cards
 * @returns {boolean}
 */
function isSignSame(cards){
    for(let i=0;i<cards.length-1;i++){
        if(cards[i][1] !== cards[i+1][1])
            return false;
    }
    return true;
}

/**
 *
 * @param {Array} cards
 * @returns {boolean}
 */
function isStraight(cards){
    let values = cards.map((x)=>x[0]).filter(x=>x !== 0); //cut out A because of double behaviors
    values.sort((x,y)=>x > y);
    for(let i=0;i<values.length-1;i++){
        if(values[i+1] !== values[i]+1)
            return false;
    }
    if(values.length === 4){  //if A was cut, we choose which rank is A, low or high
        return values[0] === 1 || values[values.length - 1] === 12;
    }
    return true;
}

/**
 *
 * @param {Array} cards
 * @returns {{pairs: number, three: number, four: number}}
 */
function frequencyCounting(cards){
    let values = cards.map((x)=>x[0]);
    values.sort();
    let map = new Map();
    for(let i=0;i<values.length;i++){
        if(map.has(values[i]) === false)
            map.set(values[i],1);
        else
            map.set(values[i],map.get(values[i])+1);
    }

    let res = new Array(5).fill(0);
    for (let it of map) {
        res[it[1]]++;
    }

    return {
        pairs: res[2],
        three: res[3],
        four: res[4]
    };
}



/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    let arr = figure.split('\n');
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            if(arr[i][j] === '+'){
                let rect = detectRectangle(arr, i, j);

                if (rect !== null){
                    yield drawRectangle(rect.weight, rect.height)
                }
            }
        }
    }
}

/**
 *
 * @param {Array} figure
 * @param {number} fromRowIndex
 * @param {number} fromColumnIndex
 *
 * @return  {x: number, y: number} basic parts
 */
function detectRectangle(figure, fromRowIndex, fromColumnIndex){

    for(let i=fromRowIndex+1;i<figure.length;i++){

        if(figure[i][fromColumnIndex] === '+'){
            for(let j=fromColumnIndex+1;j<figure[fromRowIndex].length;j++){
                if(figure[i][j] === "+"){
                    if(figure[fromRowIndex][j] === "+"){

                        let flag = true;

                        for(let k=fromRowIndex+1;k<i;k++) {
                            if(figure[k][j] !== '|') {
                                flag = false;
                                break;
                            }
                        }

                        if(flag)
                            return {height: (i-fromRowIndex + 1), weight: (j-fromColumnIndex + 1)};
                    }
                }
                else if(figure[i][j] !== '-'){
                    break;
                }
            }
        }
        else if(figure[i][fromColumnIndex] !== '|')
            break;

    }

    return null;
}

/**
 *
 * @param {number} weight
 * @param {number} height
 *
 * @return {string}
 */
function drawRectangle(weight, height){
    return '+' + '-'.repeat(weight - 2) + '+\n' +
        ('|' + ' '.repeat(weight - 2) + '|\n').repeat(height - 2) +
        '+' + '-'.repeat(weight - 2) + '+\n'
}



module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};