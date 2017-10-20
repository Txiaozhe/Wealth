## 说明

尝试 eggjs 构建系统。
- [eggjs](https://eggjs.org/)

## VSCode 调试

```sh
npm i egg-development-proxyworker --save
```

修改 config/plugin.js

```js
// config/plugin.js
exports.proxyworker = {
  enable: true,
  package: 'egg-development-proxyworker',
};
// config/config.default.js
// 如果10086被占用，你可以通过这个配置指定其他的端口号
exports.proxyworker = {
  port: 10086,
};
```

在 .vscode/launch.json
```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Egg",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": {
        "runtimeExecutable": "npm.cmd"
      },
      "runtimeArgs": [
        "run", "dev", "--", "--debug"
      ],
      "port": 5858
    },
    {
      "name": "Attach Agent",
      "type": "node",
      "request": "attach",
      "port": 5856
    },
    {
      "name": "Attach Worker",
      "type": "node",
      "request": "attach",
      "restart": true,
      "port": 10086
    }
  ],
  "compounds": [
    {
      "name": "Debug Egg",
      "configurations": ["Launch Egg", "Attach Agent", "Attach Worker"]
    }
  ]
}
```
