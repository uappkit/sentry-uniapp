<template>
  <view class="content">
    <image class="logo" mode="widthFix" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">`npm i -g uapp`</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {

  },
  methods: {}
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 690rpx;
  margin-top: 30rpx;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
