import AV from 'leancloud-storage'

var APP_ID = 'dA8GhEixGK1fxzbIePC2LOJa-gzGzoHsz';
var APP_KEY = 'yqRfxMoPGOx5rEDRNaUwPd6G';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


function parseUserFromAVUser(data) {
  return JSON.parse(JSON.stringify(data))
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
    console.log('parse user: ' + JSON.stringify(user))
    success.call(null, user)
  }, function (error) {
    fail.call(null, error)
  })
  return undefined
}

export function currentUser() {
  let user = AV.User.current()
  if (user) {
    // let r = parseUserFromAVUser(user)
    // console.log( '-- user --: ' + r['objectId'])
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
  status:  '0' ~> 正在进行; '1' ~> 已完成，归档;
  deleted: '0' ~> 未删除； '1' ~> 删除；
 }
*/
function creatOrUpdateTask(taskData, dependentId, targerObj, success) {
  targerObj.set('dependent', dependentId)
  targerObj.set('title', taskData.title)
  targerObj.set('status', taskData.status)
  targerObj.set('deleted', taskData.deleted)
  targerObj.set('testID', taskData.id)
  targerObj.save().then(function (data) {
    // console.log('synTask : ' + data)
    success(data)
    console.log(' -- doooooonnnneee ---')
  }, function (errorInfo) {
    showErrorInfo(errorInfo)
  })
}

function showErrorInfo(errorInfo) {
  console.log('error: ' + errorInfo.error)
  switch (errorInfo.code) {
    case 101:
      alert('查询的 Class 不存在，或者要关联的 Pointer 对象不存在,亲反馈给开发者')
      break
    case 103:
      alert('非法的 Class 名称')
      break
    case 124:
      alert('请求超时')
      break
    case 202:
      alert('用户名已被占用')
      break
    default:
      alert(' -> ' + errorInfo.error)
      break
  }
}


export function saveTodoTaskLeanCloud(data, success) {
  let user = currentUser()
  var userObjID = user.objectId
  console.log(` --- saveTodoTask ---> ${JSON.stringify(data)}`)
  var todo = AV.Object('Task')
  creatOrUpdateTask(data, userObjID, todo, success)
  return undefined
}

export function updateTodoLeanCloud(data, success) {
  let user = currentUser()
  var userObjID = user.objectId
  console.log(` --- updateTask ---> ${userObjID}`)
  data.map((item, index) => {
      console.log('old : ' + JSON.stringify(item))
      // 有ID - 对原对象更新
      var todo = AV.Object.createWithoutData('Task', item.objectId)
      creatOrUpdateTask(item, userObjID, todo, success)
  })
  return undefined
}

export function loadTodoData(success) {
  var query = new AV.Query('Task')
  let user = currentUser()
  var userObjID = user.objectId
  // console.log(' --- loadTodoData ---> ' + userObjID)
  query.equalTo('dependent', userObjID)
  query.find().then(function (tasks) {
    success(tasks)
  }).catch(function (error) {
    alert(JSON.stringify(error));
  });
}