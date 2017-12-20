'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    const tmp = [];
    let azimuth_counter = 0;

    let addCompassPoint = (knuckle_index_direction, next_direction) => {
        for (let position = 0; position < 8; position++) {

            let abbreviation;

            let directions_order =
                (knuckle_index_direction === sides[0] || knuckle_index_direction === sides[2]) ?
                knuckle_index_direction + next_direction : next_direction + knuckle_index_direction;

            switch (position) {
                case 0: {
                    abbreviation = knuckle_index_direction;
                    break;
                }
                case 1: {
                    abbreviation = knuckle_index_direction + 'b' + next_direction;
                    break;
                }
                case 2: {
                    abbreviation = knuckle_index_direction + directions_order;
                    break;
                }
                case 3: {
                    abbreviation = directions_order + 'b' + knuckle_index_direction;
                    break;
                }
                case 4: {
                    abbreviation = directions_order;
                    break;
                }
                case 5: {
                    abbreviation = directions_order + 'b' + next_direction;
                    break;
                }
                case 6: {
                    abbreviation = next_direction + directions_order;
                    break;
                }
                case 7: {
                    abbreviation = next_direction + 'b' + knuckle_index_direction;
                    break;
                }
            }

            let azimuth = azimuth_counter;
            azimuth_counter += 11.25;

            tmp.push({abbreviation: abbreviation, azimuth: azimuth});
        }
    };

    addCompassPoint(sides[0], sides[1]);
    addCompassPoint(sides[1], sides[2]);
    addCompassPoint(sides[2], sides[3]);
    addCompassPoint(sides[3], sides[0]);

    return tmp;
}



/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    const queue = [str];
    const tmp = []; //when we have nested {} we can have duplicates, so to avoid it we use storage of tmps.
    while (queue.length > 0) {
        str = queue.shift();
        let match = str.match(/{([^{}]+)}/);
        if (match) {
            for (let value of match[1].split(','))
                queue.push(str.replace(match[0], value));
        }
        else if (tmp.indexOf(str) < 0) {
            tmp.push(str);
            yield str;
        }
    }
}


/**
 * Returns the ZigZag tmp_array
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square tmp_array.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - tmp_array dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
     let tmp_array = new Array(n);

    for (let i = 0; i < n; i++) {
        tmp_array[i] = (new Array(n));
    }

    let i = 1, j = 1;
    for (let k = 0; k < n * n; k++) {
        tmp_array[i - 1][j - 1] = k;
        if ((i + j) % 2 === 0) {
            if (j < n)
                j++;
            else
                i += 2;
            if (i > 1)
                i--;
        } else {
            if (i < n)
                i++;
            else
                j += 2;
            if (j > 1)
                j--;
        }
    }
    return tmp_array;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    let tmp = false;

    let flags = (new Array(dominoes.length)).fill(false);

    function dfs(knuckle_index, value, counter) {
        if (counter === 0) {
            tmp = true;
            return;
        }

        flags[knuckle_index] = true;

        for (let i = 0; i < dominoes.length; i++)
            if (!flags[i]) {
                if (dominoes[i].indexOf(value) !== -1) {
                    dfs(i, dominoes[i][0] === value ? dominoes[i][1] : dominoes[i][0], counter - 1);
                }
            }

        flags[knuckle_index] = false;
    }

    for (let i = 0; i < dominoes.length; i++) {
        dfs(i, dominoes[i][0], dominoes.length - 1);
        if(tmp === false) {
            dfs(i, dominoes[i][1], dominoes.length - 1);
            if(tmp === true)
                return tmp;
        }
        else {
            return tmp;
        }
    }

    return tmp;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    let str = "";
    for (let i = 0; i < nums.length; i++) {
        let start = i;

        while (nums[++i] === nums[i - 1] + 1) {} //while range
        i--; //return index to last num in range

        if (i - start > 1) {
            str += nums[start] + "-" + nums[i];
        } else {
            str += (i - start) === 0 ? nums[i] : nums[start] + ',' + nums[i] ;
        }
        str += ',';
    }
    return str.slice(0, -1);
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
