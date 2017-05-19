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
  user.signUp().then(function (existedUser) {
    let user = parseUserFromAVUser(existedUser)
    success.call(null, user)
  }, function (error) {
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
  if (user) {
    return parseUserFromAVUser(user)
  } else {
    return undefined
  }
}

export function signOutLeanCloud() {
  AV.User.logOut()
  return undefined;
}

/*
 -model-
 {
  id: 
  title: 
  status: 
  deleted:
 }
*/ 

export function saveTodoTask(data) {
  var TaskObj = AV.Object('Task')
  TaskObj.set('info', 'tttt')

  var userObjID = currentUser().id
  data.map((item, index) => {

    console.log(index + ' : ' + JSON.stringify(item) + ' - ' + item.id)

    if (item.id === 'new') {
      // 无ID - 创建对象
      var Todo = AV.Object('Todo')
      Todo.set('dependent', userObjID)
      Todo.set('title', item.title)
      Todo.set('status', item.status)
      Todo.set('deleted', item.deleted)
      Todo.save().then(function (data) {
        console.log('synTask : ' + data)
      }, function (error) {
        console.log('error: ' + error)
        alert(error)
      })
    } else {
      // 有ID - 对原对象更新
      var todo = AV.Object.createWithoutData('Task', item.id)
      todo.set('dependent', userObjID)
      todo.set('title', item.title)
      todo.set('status', item.status)
      todo.set('deleted', item.deleted)
      todo.save().then(function (data) {
        console.log('synTask : ' + data)
      }, function (error) {
        console.log('error: ' + error)
        alert(error)
      })
    }
  })
  return undefined
}