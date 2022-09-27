declare const uni: any;  // uniapp
declare const wx: any;   // 微信小程序、微信小游戏
declare const my: any;   // 支付宝小程序
declare const tt: any;   // 字节跳动小程序
declare const dd: any;   // 钉钉小程序
declare const qq: any;   // QQ 小程序、QQ 小游戏
declare const swan: any; // 百度小程序

/**
 * 小程序平台 SDK 接口
 */
interface SDK {
  request: Function;
  httpRequest?: Function; // 针对钉钉小程序
  getSystemInfo: Function;
  getSystemInfoSync: Function;
  onError?: Function;
  onUnhandledRejection?: Function;
  onPageNotFound?: Function;
  onMemoryWarning?: Function;
  getLaunchOptionsSync?: Function;
}

/**
 * 小程序平台 接口
 */
type AppName =
  | "uniapp"
  | "wechat"
  | "alipay"
  | "bytedance"
  | "dingtalk"
  | "qq"
  | "swan"
  | "quickapp"
  | "unknown";

let currentSdk: SDK = {
  // tslint:disable-next-line: no-empty
  request: () => {
  },
  // tslint:disable-next-line: no-empty
  httpRequest: () => {
  },
  // tslint:disable-next-line: no-empty
  getSystemInfoSync: () => {
  },
  // tslint:disable-next-line: no-empty
  getSystemInfo: () => {
  },
};

/**
 * 获取跨平台的 SDK
 */
const getSDK = () => {
  if (typeof uni === "object") {
    currentSdk = uni;
  } else if (typeof wx === "object") {
    currentSdk = uni;
  } else if (typeof my === "object") {
    currentSdk = my;
  } else if (typeof tt === "object") {
    currentSdk = tt;
  } else if (typeof dd === "object") {
    currentSdk = dd;
  } else if (typeof qq === "object") {
    currentSdk = qq;
  } else if (typeof swan === "object") {
    currentSdk = swan;
  } else {
    // tslint:disable-next-line:no-console
    console.log("sentry-uniapp 暂不支持此平台, 快应用请使用 sentry-quickapp");
  }

  return currentSdk;
};

/**
 * 获取平台名称
 */
const getAppName = () => {
  let currentAppName: AppName = "unknown";

  if (typeof uni === "object") {
    currentAppName = "uniapp";
  } else if (typeof wx === "object") {
    currentAppName = "wechat";
  } else if (typeof my === "object") {
    currentAppName = "alipay";
  } else if (typeof tt === "object") {
    currentAppName = "bytedance";
  } else if (typeof dd === "object") {
    currentAppName = "dingtalk";
  } else if (typeof qq === "object") {
    currentAppName = "qq";
  } else if (typeof swan === "object") {
    currentAppName = "swan";
  }

  return currentAppName;
};

const sdk = getSDK();
const appName = getAppName();

export {sdk, appName};
