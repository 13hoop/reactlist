import React, { Component } from 'react';
// import AV from 'leancloud-storage'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as LocalStore from './LocalStore'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { currentUser, signOutLeanCloud, saveTodoTask, loadTodoData } from './LeanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    console.log(' - lc: ' + 'constructor')
    this.state = {
      user: currentUser() || {},
      newTodo: '',
      // todoList: LocalStore.load('todoList') || []
      todoList: []
    }
  }
  render() {
    console.log(' - lc: ' + 'render')
    let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
        </li>
      )
    })

    var islogIned = this.state.user.username
    // islogIned = 111;
    console.log(' user: ' + this.state.user.username)
    return (
      <div className="App">
        <h1>{this.state.user.username + "'s" || ''} Todo-list {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null} </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} />
        </div>

        {islogIned ? null : <UserDialog onSignUp={this.logInOrSignUp.bind(this)} onSignUp={this.logInOrSignUp.bind(this)} />}

        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  logInOrSignUp(user) {
    let stateCopy = this.parseJson(this.state)
    stateCopy.user = user
    console.log('-- 2 --- ' + stateCopy.user.username)
    this.setState(stateCopy)

    this.fetchAndRefresh()
  }
  signOut(e) {
    signOutLeanCloud()
    let stateCopy = this.parseJson(this.state)
    stateCopy.user = {}
    stateCopy.todoList = []
    this.setState(stateCopy)
  }

  toggle(e, todo, str) {
    console.log('- 2 -' + todo + 'str ' + str)
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    // LocalStore.save('todoList', this.state.todoList)
  }

  delete(event, todo) {
    todo.deleted = true
    this.setState(this.state)
    // LocalStore.save('todoList', this.state.todoList)
  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
    // LocalStore.save('todoList', this.state.todoList)
  }
  addTodo(event) {
    this.state.todoList.push({
      id: 'new',
      title: event.target.value,
      status: '',
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    // LocalStore.save('todoList', this.state.todoList)
    saveTodoTask()
  }
  componentDidUpdate() {
    console.log(' - lc: ' + 'componentDidUpdate')
    // 本地保存
    //  LocalStore.save('todoList', this.state.todoList)
    // 更新到leanCloud
    saveTodoTask(this.parseJson(this.state.todoList))
  }
  componentWillMount() {
    console.log(' - lc: ' + 'componentWillMount')
    this.fetchAndRefresh()
  }
  componentDidMount() {
    console.log(' - lc: ' + 'componentDidMount')
  }

  parseJson(data) {
    return JSON.parse(JSON.stringify(data))
  }

  fetchAndRefresh() {
    var _this = this
    loadTodoData(function (tasks) { 
      let stateCopy = _this.parseJson(_this.state)
      stateCopy.todoList = _this.parseJson(tasks) 
      _this.setState(stateCopy)
    })
  }

}

export default App;