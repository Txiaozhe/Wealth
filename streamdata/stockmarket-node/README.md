### streamdata.io for node demo

1. 到streamdata.io官网 https://portal.streamdata.io/#/register 注册账号并获取 App token.

2. 编辑 server.js 文件并替换 `appToken` 为你的 App token.

3. 确保 Node 版本为 0.11.5 以上

4. 安装依赖:

  ```
  npm install
  ```

> tips: 如果不能正常pull `streamdataio-js-sdk`或者`streamdataio-js-sdk-auth`请使用 sdk 文件夹里的包

5. 执行demo:

  ```
  node server.js
  ```

正常应该可以再终端看到数据或数据改变时产生的补丁输出.



你可以通过提供的API获取金融市场的股票价格:
'http://stockmarket.streamdata.io/v2/prices'

也可以自由使用其他REST/JSON API.
