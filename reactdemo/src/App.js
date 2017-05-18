import React, { Component } from 'react';
import AV from 'leancloud-storage'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as LocalStore from './LocalStore'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { currentUser } from './LeanCloud'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: currentUser() || {},
      newTodo: '',
      todoList: LocalStore.load('todoList') || []
    }
  }
  render() {
    let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
     return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
        </li>
      )
    })

    var islogIned = this.state.user.id 
    // islogIned = 111;
    return (
      <div className="App">
        <h1>{this.state.user.name || ''} Todo-list</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onBlur={this.focused.bind(this)} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} />
        </div>

        {islogIned ? null : <UserDialog onSignUp={this.successLoadData.bind(this)} onSignUp={this.successLoadData.bind(this)}/> }
        
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  successLoadData(user) {
    console.assert('-- 2 ---')
    this.state.user = user
    this.setState(this.state)
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

  focused(e) {
    console.log(' - here - ')
    console.log(e.type)
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
      id: idMaker(),
      title: event.target.value,
      status: '',
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    // LocalStore.save('todoList', this.state.todoList)
  }
  componentDidUpdate() {
     LocalStore.save('todoList', this.state.todoList)
  }
}

export default App;

let id = 0
function idMaker() {
  id += 1
  return id
}