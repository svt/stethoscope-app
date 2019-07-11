const { notarize } = require('electron-notarize')

exports.default = async function notarizing (context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  if (process.env.CSC_IDENTITY_AUTO_DISCOVERY === 'false') {
    return
  }

  const appName = context.packager.appInfo.productFilename

  return notarize({
    appBundleId: process.env.APP_BUNDLE_ID,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS
  })
}