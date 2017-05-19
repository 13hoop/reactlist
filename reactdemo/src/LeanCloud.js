import AV from 'leancloud-storage'

var APP_ID = 'dA8GhEixGK1fxzbIePC2LOJa-gzGzoHsz';
var APP_KEY = 'yqRfxMoPGOx5rEDRNaUwPd6G';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

function parseUserFromAVUser(AVUser) {
  // --- debug ---
  // var userStr = JSON.stringify(AVUser)
  // var jsonObj = JSON.parse(userStr)
  // console.log(' user_str : ' + userStr + '\n obj: ' + jsonObj.objectId)
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
  return undefined 
}

export function signInLeanCloud(name, pwd, success, fail) {
  AV.User.logIn(name, pwd).then(function (loginedUser) {
    let user = parseUserFromAVUser(loginedUser)
    console.log('parse user: ' + user)
    success.call(null, user)
  }, function (error) {
    fail.call(null, error)
  });
  return undefined 
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

export function saveTodoTask(data) {
  var TaskObj = AV.Object('Task')
  TaskObj.set('info', 'tttt')

  // 
  data.map((item, index) => {

    console.log( item)

    // 第一个参数是 className，第二个参数是 objectId
    // var todo = AV.Object.createWithoutData('Task', );
    // // 修改属性
    // todo.set('content', '每周工程师会议，本周改为周三下午3点半。');
  })
  var userObjID = currentUser().id
  // console.log(' |||~> ' + currentUser().id + '\n       ' + JSON.stringify(data))
  // TaskObj.set('dependent', userObjID)
  // TaskObj.save().then(function (data) {
  //   console.log('synTask : ' + data)
  // }, function(error) {
  //   console.log('error: ' + error)
  //   alert(error)
  // })
  return undefined
}