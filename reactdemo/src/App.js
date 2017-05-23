import React, { Component } from 'react';
// import AV from 'leancloud-storage'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
// import * as LocalStore from './LocalStore'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { currentUser, signOutLeanCloud, loadTodoData, saveTodoTaskLeanCloud, updateTodoLeanCloud } from './LeanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    console.log(' - lc: ' + 'constructor')
    this.state = {
      user: currentUser() || {},
      putWords: '',
      todoList: []
    }
  }
  render() {
    console.log(' - lc: ' + 'render')
    let todos = this.state.todoList.filter((item) => item.deleted === '0').map((item, index) => {
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
        <h1>{this.state.user.username + "'s" || ''} Todo-list {this.state.user.username ? <button onClick={this.signOut.bind(this)}>登出</button> : null} </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.putWords} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} />
        </div>

        {islogIned ? null : <UserDialog onAction={this.logInOrSignUp.bind(this)} />}

        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  logInOrSignUp(user) {
    let stateCopy = this.parseJson(this.state)
    stateCopy.user = user
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

  toggle(e, todo) {
    console.log('- 2 -' + JSON.stringify(todo))
    todo.status = todo.status === '1' ? '0' : '1'
    console.log('- 2 -' + JSON.stringify(todo))
    updateTodoLeanCloud(todo, (data) => {
      // console.log('update data, refresh page')
      this.setState(this.state)
    })
  }

  delete(event, todo) {
    todo.deleted = '1'
    this.setState(this.state)
    updateTodoLeanCloud(todo, (data) => {
      // console.log('update data, refresh page')
      this.setState(this.state)
    })
  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event) {
    console.log('have exist : ' + JSON.stringify(this.state.todoList))
    var newTodoData = {
      id: '',
      title: event.target.value,
      status: '0',
      deleted: '0'
    }
    this.state.todoList.push(newTodoData)
    this.setState({
      putWords: '',
      todoList: this.state.todoList
    })
    saveTodoTaskLeanCloud(newTodoData, (data) => {
      // console.log('save done ,then refresh page')
      this.setState(this.state)
    })
  }

  componentDidMount() {
   if (this.state.user.username) {
      this.fetchAndRefresh()
    }
  }

  parseJson(data) {
    return JSON.parse(JSON.stringify(data))
  }

  fetchAndRefresh() {
    loadTodoData((tasks) => {
      let stateCopy = this.parseJson(this.state)
      stateCopy.todoList = this.parseJson(tasks)
      this.setState(stateCopy)
    })
  }
}

export default App;