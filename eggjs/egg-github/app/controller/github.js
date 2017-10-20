/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
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
 *     Initial: 2017/07/22        Tang Xiaoji
 */

'use strict';

let Github = require("github-api");

let LoginStr = `
<!DOCTYPE html>
<html>
<head>
	<title>Github Blogs</title>
</head>
<body>
	<div style="text-align: center; margin-top: 300px; font-size: 5em;">
		Login with <a href="https://github.com/login/oauth/authorize?scope=user+public_repo&client_id=fa31a1d8e4a0d4c9dd12">Github</a>
	</div>
</body>
</html>`

module.exports = app => {
  class GitHubController extends app.Controller {
    * repos() {
      const { ctx } = this;
      const { origin } = ctx.request.body;
      ctx.body = yield ctx.service.github.repos(origin);
    }

    * issues() {
      const { ctx } = this;
      ctx.body = yield ctx.service.github.issues();
    }

    * createIssue() {
      const { ctx } = this;
      const { token, title, body, labels } = ctx.request.body;
      ctx.body = yield ctx.service.github.createIssue(token, title, body, labels);
    }

    * commentIssue() {
      const { ctx } = this
      const { token, id, body } = ctx.request.body
      ctx.body = yield ctx.service.github.commentIssue(token, id, body);
    }

    * checkUser() {
      const { ctx, } = this;
    }

    * userLogin() {
      const { ctx } = this;
      ctx.body = LoginStr
    }

    * userLoginCallback() {
      const { ctx } = this;
      let query = ctx.query
      ctx.body = yield ctx.service.github.userLoginCallback(query)
    }
  }

  return GitHubController;
};
