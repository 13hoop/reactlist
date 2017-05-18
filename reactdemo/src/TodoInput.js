import React, {Component} from 'react'
import './TodoInput.css'

export default class TodoInput extends Component {
    render(){
        return <input type="text" className="TodoInput" ref="TodoInput" onKeyPress={this.submit.bind(this)} placeholder="点击添加task"/>
    }
    submit(e) {
        console.log(' ~> ' + e.key)
        if(e.key === 'Enter') {
            this.props.onSubmit(e)
            this.refs.TodoInput.value = null
        }

    }
}

/* 
* 处理uncontrolled 输入中文文本框参考
*
const Cinput = (props: Object) => {
  // record if is on Composition
  let isOnComposition: boolean = false

  const handleComposition = (e: KeyboardEvent) => {
    if (e.type === 'compositionend') {
      // composition is end
      isOnComposition = false
    } else {
      // in composition
      isOnComposition = true
    }
  }

  const handleChange = (e: KeyboardEvent) => {
    // only when onComposition===false to fire onChange
    if (e.target instanceof HTMLInputElement && !isOnComposition) {
      props.onChange(e)
    }
  }

  return (
    <input
      {...props}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={handleChange}
    />
  )
}

export default Cinput*/