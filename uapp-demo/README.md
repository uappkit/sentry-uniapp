## webapp 模版工程

模版里集成了 unocss/tailwindcss, uvui。

直接使用 tailwindcss 写样式，支持 `rpx` 单位，可参考 `pages/index/index.vue` 示例代码。

```bash
# 先安装依赖库
npm install
```

### 1. 如何自定义配置

修改文件 `common/config.js`

```js
// API_BASE_URL: API请求的URL域名前缀
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'https://api.code0xff.com/'
  : 'https://api-dev.app.code0xff.com/'

// LOGIN_PAGE: 改为自己的登陆页面，HTTP请求401时，会跳转到登陆页
export const LOGIN_PAGE = '/pages/login/login'

// HOME_PAGE: 成功登录后的首页，或从登录导航栏跳转到首页
export const HOME_PAGE = '/pages/index/index'

// 使用 uni.setStorageSync(TOKEN_KEY) 保存用户的 token
export const TOKEN_KEY = 'token'

```

### 2. 如何直接写 class 样式：

```js
<view class="h-520rpx flex flex-row justify-center items-center w-screen">
  <image class="w-300rpx h-300rpx" src="/static/banner.png"></image>
</view>
```


### 3. 如何使用 @apply 定义 class:

```vue
<!-- 直接 class 里写 tailwindcss -->
<view class="w-100rpx h-100rpx rounded-full overflow-hidden mx-30rpx"></view>
```

```vue
<!-- 使用 @apply 可以直接 COPY  class 内的代码 -->
<view class="btn-item"></view>

.btn-item {
  @apply w-100rpx h-100rpx rounded-full overflow-hidden mx-30rpx;
}
```

### 4. 如何直接用 uni.$uv.http 网络请求:

> 注意 GET 方法和 POST等其他方法，从第二个参数开始的区别

**GET 方法**

```js
// 用uni.$uv.queryParams 拼接URL字串
uni.$uv.http.get("/api/categories" + uni.$uv.queryParams(params))

// 直接内嵌变量
uni.$uv.http.get(`api/data/list?page=${page}&perPage=${perPage}`)
```

**POST 方法**

```js
// 直接使用 post
uni.$uv.http.post('/api/auth/apple/oaut', {
  info: loginRes.appleInfo,
}).then(res => {
  // ...
})

// POST 方法，注意第三个参数 custom.catch = true, 避免异常被 http 封装拦截
let res = await uni.$uv.http.post('/api/auth/apple/oauth', {
  info: loginRes.appleInfo,
}, {
  custom: { catch: true },
}).then(res => {
  // ...
})
```

**上传 upload 用法**

```js
uni.$uv.http.upload('/api/video/mixcut', {
  name: this.fileList[0].name,
  filePath: this.fileList[0].url,
  formData: this.FormData
}).then(res => {
  this.fileList = []
  uni.navigateBack()
}).catch(() => {
  uni.$uv.toast('提交失败!')
})
```

**如何集成 sentry**

`npm i sentry-uniapp`

<https://github.com/uappkit/sentry-uniapp>

### 5. 参考

uapp 文档，方便 uni-app 跨平台快速开发的 cli  
<https://github.com/uappkit/uapp>

tailwindcss 文档  
<https://tailwindcss.com/docs/container>

uvui (基于uview，支持 vue3)  
https://www.uvui.cn/components/intro.html
