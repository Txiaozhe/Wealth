/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/08/28        Feng Yifei
 */

'use strict';

const R = require('ramda');

// add
console.log(`1 + 2 = ${R.add(1)(2)}`);

// apply
const nums = [3, -2, 110, 43, 129, -1023, 86];
console.log(`Max ${nums} is: ${R.apply(Math.max, nums)}`);

// any
const lessThan0 = R.flip(R.lt)(0);  // f(g(x)) => y = g(x); f(y)
const lessThan2 = R.flip(R.lt)(2);
const target = [1, 2];
console.log(`Any element in ${target} less than 0: ${R.any(lessThan0)(target)}`);
console.log(`Any element in ${target} less than 0: ${R.any(lessThan2)(target)}`);

// ap
console.log(`ap test:${R.ap([R.multiply(2), R.add(3)], [1,2,3])}`);
