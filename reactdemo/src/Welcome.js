import React from 'react'

const divStyle = {
    color: "lightBlue",
}


// function Welcome(props) {
//     return <h1 style={divStyle}>{props.name}</h1>
// }

/*
    props: 是为了让属性赋值更为接近原生，它是readOnly的

    state: 用来更新，其操作会自动触发`willReceiveProps` -> `shouldComponentUpdate` -> `willUpdate` -> `render` -> `DidUpdate` 的生命周期过程
*/

class Welcome extends React.Component {

    constructor(props) {
        super(props)

        this.setState({
        })
    }

    render() {
        return <h1 style={divStyle}>{this.props.name}</h1>
    }
}

// 这是ES6语法的需要，你可以通过import来使用
export default Welcome