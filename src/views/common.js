export const getBadge = (status) => {
  switch (status) {
    case false:
      return 'success'
    case true:
      return 'danger'
    default:
      return ''
  }
}

export const getOS = (code) => {
  switch (code) {
    case 0:
      return 'iOS'
    case 1:
      return 'Android'
    case 2:
      return 'Amazon'
    case 3:
      return 'WindowsPhone '
    case 4:
      return 'Chrome Apps'
    case 5:
      return 'Chrome Web Push'
    case 6:
      return 'Windows'
    case 7:
      return 'Safari'
    case 8:
      return 'Firefox'
    case 9:
      return 'MacOS'
    case 10:
      return 'Alexa'
    case 11:
      return 'Email'
    case 13:
      return 'Huawei App Gallery Builds. Not for Huawei Devices using FCM'
    case 14:
      return 'SMS'
    default:
      return 'N/A'
  }
}
