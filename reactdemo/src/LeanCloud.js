import AV from 'leancloud-storage'

var APP_ID = 'dA8GhEixGK1fxzbIePC2LOJa-gzGzoHsz';
var APP_KEY = 'yqRfxMoPGOx5rEDRNaUwPd6G';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

function parseUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    name: AVUser.userName,
  }
}

export default AV
export function signUpLeanCloud(name, pwd, success, fail) {
  var user = new AV.User()
  user.setUsername(name)
  user.setPassword(pwd)
  user.signUp().then(function(existedUser) {
    let user = parseUserFromAVUser(existedUser)
    success.call(null, user)
  }, function(error) {
    fail.call(null, error)
  })
  return undefined // have to return
}

export function signInLeanCloud(name, pwd, success, fail) {
  AV.User.logIn(name, pwd).then(function (loginedUser) {
    let user = parseUserFromAVUser(loginedUser)
    success.call(null, user)
  }, function (error) {
    fail.call(null, error)
  });
  return undefined // have to return
}

export function currentUser() {
  let user = AV.User.current()
  if(user) {
    return parseUserFromAVUser(user)
  }else {
    return undefined
  }
}