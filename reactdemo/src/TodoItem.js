import React, {Component} from 'react'
import './TodoItem.css'

function randomColored() {
    let ccc = "#"+((1<<24)*Math.random()|0).toString(16)
    // console.log(' - random colored is : ' + ccc)
    return ccc
}

export default class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {hover: false}
    }
    render() {
        let ccc = randomColored()
        let linkStyle;
        if (this.state.hover) {
            linkStyle = {backgroundColor: ccc, color: 'white'}
        } else {
            linkStyle = {backgroundColor: '#56a7af'}
        } 
        return (
            <div className="TodoItem">
                <div className="tagDiv" style={{backgroundColor: ccc}}></div>
                <input type="checkbox" checked={this.props.todo.status === '1'} onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button style={linkStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    toggleHover(e) {
        this.setState({hover: !this.state.hover})
    }
    delete(e) {
        this.props.onDelete.call(null, this.props.todo)
    }
    toggle(e) {
        this.props.onToggle.call(null, this.props.todo)
    }
}