/*
 * MIT License
 *
 * Copyright (c) 2017 Feng Yifei.
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
 *     Initial: 2017/08/16        Feng Yifei
 */

'use strict';

import DeepStream from '../deepstream';
const debug = require('debug')('koa:deepstream:controller:websocket');

export default function onWebsocketConnection (ctx) {
  // websocket receives a message.
  let onWebsocketReceiveMessage = (msg) => {
    const message = JSON.parse(msg);
    message.from = userID;

    debug(`received message from ${message.from} ${msg}`);
    DeepStream.send(message);
  };

  // deepstream callback
  let onWebsocketSendMessage = (conn) => (ev) => {
    const { message } = ev;

    debug(`send message to ${message.to}`);

    try {
      conn.send(JSON.stringify(message));
    } catch (err) {
      debug(`sending message to ${message.to} error: ${err}`);
    }
  };

  // websocket disconnected.
  let onWebsocketClosed = () => {
    debug(`connection closed for ${userID}`);
    DeepStream.close(userID);
  };

  let userID;

  try {
    userID = ctx.request.query.id;

    if (userID !== undefined) {
      debug(`connection from user: ${userID}`);

      DeepStream.watch(userID, onWebsocketSendMessage(ctx.websocket));
      ctx.websocket.on('message', onWebsocketReceiveMessage);
      ctx.websocket.on('close', onWebsocketClosed)
    }
  } catch (err) {
    debug(`Critical error:${err}`);
  }
}
