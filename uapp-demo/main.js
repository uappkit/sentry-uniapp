import App from './App'

import uvUI from '@climblee/uv-ui'
import { Request } from '@/common/http/index'
import 'uno.css'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

Vue.use(uvUI);

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uvUI)
  Request(app)

  return {
    app
  }
}
// #endif