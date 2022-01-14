const getters = {
  isTopbarBlock: state => state.app.isTopbarBlock,
  currentRoute: state => state.app.currentRoute,
  // 用户部分
  access_token: state => state.user.access_token,
  login_token: state => state.user.login_token,
  user_info: state => state.user.user_info
}
export default getters
