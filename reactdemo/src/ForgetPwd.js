import React, { Component } from 'react'

class ForgetPwd extends Component {
    constructor(props) {
        super(props)
    }
    formSubmited() {
        this.props.onSubmit.call(null)
    }
    render() {
        return (
            <div className="forgetPwd panes">
                <button onClick={this.props.onSignIn}>&lt; 返回登录</button>
                <form onSubmit={this.formSubmited.bind(this)}> {/* 登录*/}
                    <div className="cell">
                        <label>注册邮箱</label>
                        <input type="text" value={this.props.formData.email} placeholder="输入注册邮箱地址，验证重制操作"
                            onChange={this.props.onChange.bind(null, 'email')} />
                    </div>
                    <div className="cell action">
                        <button type="submit">发送重置邮件</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default ForgetPwd