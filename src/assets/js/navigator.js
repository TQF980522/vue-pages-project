export default class Navigator {
  // 单页间跳转方法
  static openRouter({ query = {}, name = '', type = '' } = {}) {
    let params = ''

    const formatQuery = query => {
      let params = ''
      if (query) {
        for (const item in query) {
          const vals = query[item]
          if (vals !== undefined) {
            params += item + '=' + vals + '&'
          }
        }
      }
      params = params ? '?' + params : params

      return params
    }
    if (query) {
      params = formatQuery(query)
    }
    let homepath = process.env.NODE_ENV === 'production' ? `/` : `/${location.pathname.split('/')[1]}/`;
    const url = `${homepath}${name}${params}` // 拼接url
    if (type === 'replace') {
      location.replace(url) // replace 跳转
    } else {
      location.href = url // href 跳转
    }
  }
}
