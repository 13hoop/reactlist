import AV from 'leancloud-storage'

var APP_ID = 'dA8GhEixGK1fxzbIePC2LOJa-gzGzoHsz';
var APP_KEY = 'yqRfxMoPGOx5rEDRNaUwPd6G';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});



// 创建对象
var Task = AV.Object.extend('Task');

var task = new Task()
task.set('name', 'aaa')
task.save().then(function (todo) {              console.log('objectId is ' + todo.id);
}, function (error) {
  console.error(error);
});

function parseUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
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
    console.log('parse user: ' + user)
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

export function signOutLeanCloud() {
  AV.User.logOut()
  return undefined;
}