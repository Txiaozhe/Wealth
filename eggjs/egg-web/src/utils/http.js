/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017-07-27        TangXiaoji
 */

"use strict";

function * requestByGet(url) {
  console.log("Get " + url + " started.");

  try {
    let resp = yield fetch(url, { // eslint-disable-line no-undef
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    let json = yield resp.json()

    return json
  } catch (error) {
    throw error
  }
}

function requestByPost(url, params, onSucceed, onFailure) {
  fetch(url, { // eslint-disable-line no-undef
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(params)
  })
    .then((resp) => resp.json())
    .then((json) => {
      console.log("Post succeed for " + url + ", response:" + JSON.stringify(json));
      onSucceed(json);
    })
    .catch((err) => {
      //console.error("[HTTP Exception] Post failed for " + url + ", error:" + err);

      if (onFailure) {
        onFailure(err);
      }
    });
}

export const Http = {
  get: requestByGet,
  post: requestByPost
};
