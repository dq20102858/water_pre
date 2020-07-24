
├── build                          # 构建相关
│   ├── build.js
│   ├── ...
│   └── webpack.prod.conf.js
├── config                          # 构建不同环境配置文件
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── sit.env.js
├── dist                            # 打包导出静态资源
│   ├── favicon.ico                 # favicon图标
│   ├── index.html                  # html模板
│   └── static                      # 静态资源css,js,img
│       ├── css
│       ├── fonts
│       ├── img
│       ├── js
│       └── tinymce4.7.5
├── favicon.ico                     # favicon图标
├── index.html                      # html模板
├── package.json
├── src                             # 源代码
│   ├── App.vue                     # 入口页面
│   ├── api                         # 所有请求
│   │   ├── 912cms
│   │   ├── ...
│   │   └── webrequest
│   ├── assets                      # 主题 字体等静态资源
│   │   ├── css
│   │   └── image
│   ├── authorityCode.js
│   ├── components                  # 全局公用组件
│   │   ├── Breadcrumb
│   │   ├── ...
│   │   └── charts
│   ├── directive                   # 全局指令
│   │   ├── clipboard
│   │   ├── ...
│   │   └── waves
│   ├── filters                     # 全局 filter
│   │   └── index.js
│   ├── icons                       # 项目所有 svg icons
│   │   ├── index.js
│   │   └── svg
│   ├── main.js                     # 入口文件 加载组件 初始化等
│   ├── permission.js               # 权限管理
│   ├── router                      # 路由
│   │   └── index.js                # 912cms,912租房,房鲸灵路由注册，key以路由路径命名，value值同router文件
│   ├── store                       # 全局 store管理
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   ├── utils                       # 全局公用方法
│   │   ├── auth.js
│   │   ├── ...
│   │   └── validate.js
│   └── views                       # boss视图文件目录
│       ├── 912cms                  # 912cms文件目录
│       ├── 912hf                   # 912hf文件目录
│       ├── fjingling               # 房鲸灵文件目录
│       ├── errorPage               # 错误页面
│       ├── authority               # 912cms页面文件
│       ├── layout                  # 公共视图模块
│       ├── login                   # boss登陆模块
└── yarn.lock

