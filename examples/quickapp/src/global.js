/**
 * @file 全局能力的配置与获取
 * 文档地址：https://doc.quickapp.cn/tutorial/framework/optimization-skills.html#%E4%BD%BF%E7%94%A8-globaljs
 */

function getGlobalRef() {
  return Object.getPrototypeOf(global) || global
}

const quickappGlobal = getGlobalRef()

/**
 * 设置全局(被APP与Page共享)数据；
 * @param key {string}
 * @param val {*}
 */
function setGlobalData(key, val) {
  quickappGlobal[key] = val
}

/**
 * 获取全局(被APP与Page共享)数据；
 * @param key {string}
 * @return {*}
 */
function getGlobalData(key) {
  return quickappGlobal[key]
}

// 两个方法默认定义在全局
setGlobalData('setGlobalData', setGlobalData)
setGlobalData('getGlobalData', getGlobalData)

export { setGlobalData, getGlobalData }
