# shortURL

这是武丑兄短链项目的开源仓库。

项目结构

```js
├── LICENSE
├── README.md
├── config
│   ├── vue.js //前端配置信息
│   ├── node.js //后端配置信息
│   └── shorturl.conf //nginx反代配置文件
├── home //vue 短链导航站前端
└── nodeapi //node 后端api
```

该项目采用**session-cookie**机制来进行api鉴权，由于cookie在跨域时会产生非常非常非常多的限制，故本项目需要利用nginx来反向代理，使得前端页面url和api的url为同一个域，从而解决跨域问题。

在线预览链接: [https://url.wuuconix.link](https://url.wuuconix.link)


