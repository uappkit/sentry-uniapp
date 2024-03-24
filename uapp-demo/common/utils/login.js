import { HOME_PAGE, LOGIN_PAGE } from '@/common/config'

export const goLoginPage = () => {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}

export const goHomePage = () => {
  uni.switchTab({
    url: HOME_PAGE,
  })
}

export const logoutAppleAccount = async () => {
  new Promise((resolve, reject) => {
    plus.oauth.getServices((services) => {
      let auths = []
      for (let service of services) {
        auths[service.id] = service
      }

      if (!auths['apple']) {
        return reject('no apple provider')
      }

      auths['apple'].logout(res => {
        resove(res)
      }, err => {
        reject(err)
      })
    })
  })
}
