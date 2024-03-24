// 此vm参数为页面的实例，可以通过它引用vuex中的变量
import { goLoginPage } from '@/common/utils/login'
import { API_BASE_URL, TOKEN_KEY } from '@/common/config'

export const Request = (vm) => {
  // 初始化请求配置
  uni.$uv.http.setConfig((config) => {
    config = {
      baseURL: API_BASE_URL,
      dataType: 'json',
      // #ifndef MP-ALIPAY
      responseType: 'text',
      // #endif
      // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
      custom: {}, // 全局自定义参数默认值

      header: {
        Accept: 'application/json',
        // #ifdef H5 || ELECTRON
        appid: 'wx-web-appid',
        // #endif
        // #ifndef H5 || ELECTRON
        Referer: 'https://code0xff.com/wx-app-appid/app/page-frame.html',
        // #endif
      },

      // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
      timeout: 60000,
      // #endif
      // #ifdef APP-PLUS
      sslVerify: true,
      // #endif
      // #ifdef H5
      // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
      withCredentials: false,
      // #endif
      // #ifdef APP-PLUS
      firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
      // #endif
    }

    return config
  })

  uni.$uv.http.getHeaderWithToken = (config = null) => {
    if (!config) {
      config = uni.$uv.http.config
    }

    let token = uni.getStorageSync(TOKEN_KEY)
    if (token) {
      config.header.Authorization = `Bearer ${token}`
    }
    return config.header
  }

  // 请求拦截
  uni.$uv.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    uni.$uv.http.getHeaderWithToken(config)
    return config
  }, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })

  // 响应拦截
  uni.$uv.http.interceptors.response.use((response) => {
    // 对响应成功做点什么 可使用async await 做异步操作
    const data = response.data

    if (response.statusCode === 429) {
      uni.$uv.toast('您的操作过于频繁，请稍后再试')
      return Promise.reject('您的操作过于频繁，请稍后再试')
    }

    if (response.statusCode === 401) {
      // token过期
      uni.removeStorageSync(TOKEN_KEY)
      goLoginPage()
      return new Promise(() => {})
    }

    // 自定义参数
    const custom = response.config?.custom
    if (response.statusCode !== 200) {
      // getApp().globalData.sentry.captureMessage(data.message, data)

      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (custom.toast !== false) {
        uni.$uv.toast(data.message)
      }

      // 如果需要catch返回，则进行reject
      if (custom?.catch) {
        return Promise.reject(data)
      } else {
        // 否则返回一个pending中的promise，请求不会进入catch中
        return new Promise(() => {})
      }
    }

    return data
  }, (response) => {
    // 对响应错误做点什么 （statusCode !== 200）
    return Promise.reject(response)
  })
}
