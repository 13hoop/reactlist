import React, {Component} from 'react'
import './TodoItem.css'

function randomColored() {
    let ccc = "#"+((1<<24)*Math.random()|0).toString(16)
    console.log(' - random colored here - \n is ' + ccc)
    return ccc
}

export default class TodoItem extends Component {
    render() {
        return (
            <div className="TodoItem">
                <div className="tagDiv" style={{backgroundColor: randomColored()}}></div>
                <input type="checkbox" checked={this.props.todo.status === 'completed'} onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    delete(e) {
        this.props.onDelete(e, this.props.todo)
    }
    toggle(e) {
        console.log('- 1 -:' + this.props.todo)
        this.props.onToggle(e, this.props.todo, 'xxx')
    }
}