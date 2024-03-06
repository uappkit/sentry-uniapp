<script>

import * as sentry from 'sentry-uniapp';
export default {
  onLaunch: function () {
    console.log('App Launch');
    sentry.init({
      // __DSN__ 参考格式: https://8137b89b2d1c4e349da3a38dca80c5fe@sentry.io/1
      dsn: '__DSN__',

      // extraOptions 主要是解决平台差异问题的，见下方说明
      // 非 APP 平台，可以不实用
      extraOptions: { onmemorywarning: false, onerror: false }
    });

    // 触发一个未定义函数的错误
    balabala();
  },

  // sentry-uniapp 内部是通过 uni.onError 钩子函数捕获错误的
  // 但目前 uni.onError 暂不支持 App (android / ios)，各平台支持情况参考：
  // https://uniapp.dcloud.net.cn/api/application.html#onerror
  //
  // 通用方案：可用 App.onError 自己处理，但需要先禁用 sentry 里的捕获
  // 方法在 sentry.init 参数里加上 extraOptions: { onerror: false }
  onError(e) {
    sentry.captureException(e);
  },

  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  }
};
</script>

<style>
/*每个页面公共css */
</style>
