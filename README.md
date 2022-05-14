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

本项目能够实现的功能

+ 短链跳转 
    > 比如 [https://url.wuuconix.link/epic](https://url.wuuconix.link/epic) 将跳转到epic官网

+ 首页导航
    > vue3.2.33 与 element-plus2.2.0 编写的精美的页面

+ 管理功能
    > 用户在登录后将可以对短链记录进行管理，包括新增、更新、删除等操作。
    >
    > 这些管理将完全在导航页面完成，不需要跳转页面，更加统一。


在线预览链接: [https://url.wuuconix.link](https://url.wuuconix.link)

![项目截图](https://tvax3.sinaimg.cn/large/007YVyKcly1h28373zzm8j30rk0ipdni.jpg)
