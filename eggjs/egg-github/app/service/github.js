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

'use strict'

let GitHubApi = require('github')
let url = require('../constant/url')
let URL = require('url')

const credentials = {
  client: {
    id: 'fa31a1d8e4a0d4c9dd12',
    secret: '378cf75aaa017803d95a90999865bdc37e84f8b7'
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  }
}

let github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: 'api.github.com',
  pathPrefix: '',
  headers: {
    'user-agent': 'A Github Blog'
  },
  Promise: require('bluebird'),
  followRedirects: false,
  timeout: 5000
})

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials)

module.exports = app => {
  class GitHubService extends app.Service {
    * repos (orgin) {
      let {ctx} = this
      return yield ctx.curl(url.githubReposUrl(orgin), {
          dataType: url.dataType,
          timeout: url.timeout
        })
    }

    * issues () {
      let {ctx} = this
      let result

      try {
        result = yield ctx.curl(url.githubIssuesUrl(), {
          dataType: url.dataType,
          timeout: url.timeout
        })
      } catch (e) {
        ctx.logger.error(e)
      }

      return res
    }

    * createIssue (token, title, body, labels) {
      let { ctx } = this
      let result

      try {
        result = yield ctx.curl(url.githubCreateIssues(), {
          method: 'POST',
          contentType: 'json',
          headers: {
            Authorization: `token ${token}`
          },
          data: {
            title: title,
            body: body,
            labels: labels
          },
          dataType: 'json'

        })
      } catch (e) {
        ctx.logger.error(e)
      }

      return {status: result.status}
    }

    * commentIssue (token, number, body) {
      let { ctx } = this
      let result

      try {
        result = yield ctx.curl(url.githubCommentIssues(number), {
          method: 'POST',
          contentType: 'json',
          headers: {
            Authorization: `token ${token}`
          },
          data: {
            body: body
          },
          dataType: 'json'

        })
      } catch (e) {
        ctx.logger.error(e)
      }

      return result
    }

    * userLoginCallback (authcode) {
      let {ctx} = this
      let result
      let token

      const tokenConfig = {
        code: authcode.code,
        redirect_uri: url.githubCallback()
      }

      yield oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
        if (error) {
          console.error('Access Token Error', error.message)
          return ''
        }

        console.log('The resulting token: ', result)
        token = oauth2.accessToken.create(result)

        github.authenticate({
          type: 'oauth',
          token: token.access_token
        })

        return token
      })

      return token
    }
  }

  return GitHubService
}
