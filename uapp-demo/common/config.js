/**
 * Author: Qisen Yz <yinqisen@gmail.com>
 * Github: https://github.com/uappkit/uapp
 *
 * Copyright(c) 2022 - 2024, uapp.dev
 */

// API_BASE_URL: API请求的URL域名前缀
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'https://api-dev.code0xff.com/'
  : 'https://api.code0xff.com/'

// LOGIN_PAGE: 改为自己的登录页面，HTTP请求401时，会跳转到登录页
export const LOGIN_PAGE = '/pages/login/login'

// HOME_PAGE: 成功登录后的首页，或从登录导航栏跳转到首页
export const HOME_PAGE = '/pages/index/index'

// 使用 uni.setStorageSync(TOKEN_KEY) 保存用户的 token
export const TOKEN_KEY = 'token'
