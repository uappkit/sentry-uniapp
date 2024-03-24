<template>
  <view class="content">
    <image class="w-690rpx my-30rpx" mode="widthFix" src="/static/logo.png"></image>
    <view class="flex justify-center">
      <text class="text-36rpx text-#8f8f94">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '`npm i -g uapp`'
    };
  },
  onLoad() {

  },
  methods: {}
};
</script>

<style>
.content {
  @apply flex flex-col items-center justify-center;
}
</style>
