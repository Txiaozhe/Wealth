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
 *     Initial: 2017/07/25        Tang Xiaoji
 */

'use strict';

module.exports = {
  timeout: 13 * 1000,
  dataType: 'json',

  Organize: "Txiaozhe",
  Project: "GitHubBlog",

  githubReposUrl(organize) {
    return 'https://api.github.com/orgs/' + organize + '/repos';
  },
  githubIssuesUrl() {
    return `https://api.github.com/repos/${this.Organize}/${this.Project}/issues?state=open`;
  },

  githubCreateIssues() {
	  return `https://api.github.com/repos/${this.Organize}/${this.Project}/issues`
  },

  githubCommentIssues(number) {
    return `https://api.github.com/repos/${this.Organize}/${this.Project}/issues/${number}/comments`
  },

  githubCallback() {
    return `http://127.0.0.1:7001/github/callback`;
  }
};
