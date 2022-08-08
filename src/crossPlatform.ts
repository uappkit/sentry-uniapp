const globalCopy: any = global;

declare const uni: any;  // uniapp
declare const wx: any;   // 微信小程序、微信小游戏
declare const my: any;   // 支付宝小程序
declare const tt: any;   // 字节跳动小程序
declare const dd: any;   // 钉钉小程序
declare const qq: any;   // QQ 小程序、QQ 小游戏
declare const swan: any; // 百度小程序
declare const QuickApp: any; // 快应用

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

// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const fetch = require('@system.fetch')

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
  } else if (typeof fetch === 'object') {

    // 针对快应用的兼容性封装
    globalCopy.getCurrentPages = () => {
      // tslint:disable-next-line:no-implicit-dependencies
      const router = require('@system.router')
      const stacks: any = router.getPages()
      const ret = []
      for (const route of stacks) {
        ret.push({
          route: route.path,
          options: {},
        })
      }

      return ret
    }

    currentSdk.request = fetch.fetch
    currentSdk.getSystemInfo = () => {
      return new Promise<any>((resolve, reject) => {
        // tslint:disable-next-line:no-implicit-dependencies
        const app = require('@system.app')
        const appInfo = app.getInfo();

        // tslint:disable-next-line:no-implicit-dependencies
        const device = require('@system.device')

        // tslint:disable-next-line:no-implicit-dependencies
        const battery = require('@system.battery')

        const ret = {
          version: appInfo.versionName,
          battery: 0,
          batteryLevel: 0,
          currentBattery: 0,
          appName: appInfo.name,
          system: '',
          model: String,
          brand: String,
          platform: String,
          screenHeight: Number,
          screenWidth: Number,
          statusBarHeight: Number,
          language: String,
          windowWidth: Number,
          windowHeight: Number,
          fontSizeSetting: '',
        }

        device.getInfo({
          // tslint:disable-next-line:no-shadowed-variable
          success: (deviceInfo: any) => {
            ret.language = deviceInfo.language;
            ret.brand = deviceInfo.brand;
            ret.model = deviceInfo.model;
            ret.platform = deviceInfo.platformVersionName;
            ret.screenHeight = deviceInfo.screenHeight;
            ret.screenWidth = deviceInfo.screenWidth;
            ret.statusBarHeight = deviceInfo.statusBarHeight;
            ret.windowHeight = deviceInfo.windowHeight;
            ret.windowWidth = deviceInfo.windowWidth;
            ret.system = `${deviceInfo.osType} ${deviceInfo.osVersionName}`;

            battery.getStatus({
              success: (batteryStatus: any) => {
                ret.currentBattery = batteryStatus.level;
                resolve(ret)
              },
              fail: (e: any) => {
                reject(e)
              }
            })
          },
          fail: (e: any) => {
            reject(e)
          }
        })
      })
    }

  } else {
    // tslint:disable-next-line:no-console
    console.log("sentry-uniapp 暂不支持此平台");
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
  } else if (typeof fetch === "object") {
    currentAppName = "quickapp";
  }

  return currentAppName;
};

const sdk = getSDK();
const appName = getAppName();

export {sdk, appName};
