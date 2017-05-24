import React, { Component } from 'react'
import './UserDialog.css'
import { signUpLeanCloud, signInLeanCloud } from './LeanCloud'

class SignInAndUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "signIn",
        }
    }
    validFormData(formInfo) {
        let validateEmail = function (email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }

        let { email, name, pwd } = formInfo
        if (!validateEmail(email)) {
            alert('请输入正确的邮箱地址')
            return
        }
        if (name.length < 3) {
            alert('注册名至少3个字符')
            return
        }
        if (pwd.length < 6) {
            alert('密码不少于6位')
            return
        }
    }
    signUp(e) {
        e.preventDefault()
        this.validFormData(this.props.formData)
        let { email, name, pwd } = this.props.formData
        let success = (user) => {
            // console.log('succ ' + JSON.stringify(user))
            this.props.onSignUp.call(null, user)
        }
        let fail = (error) => {
            console.log('error')
        }
        if (email.length > 5 && name.length >= 3 && pwd.length >= 6) {
            console.log( 'email ' + email )
            signUpLeanCloud(email, name, pwd, success, fail)
        }
    }
    signIn(e) {
        e.preventDefault()
        let name = this.props.formData.name
        let pwd = this.props.formData.pwd
        let success = (user) => {
            // console.log('succ ' + user)
            this.props.onSignIn.call(null, user)
        }
        let fail = (error) => {
            console.log('error')
            alert(error)
        }
        if (name.length >= 3 && pwd.length >= 6) {
            signInLeanCloud(name, pwd, success, fail)
        } else {
            alert('用户名和密码的格式不对，请检查后重新操作')
        }
    }
    render() {
        return (
            <div className="dialog">
                <nav>
                    <label className={this.state.selected === "signUp" ? 'selected' : ''}>
                        <input type="radio" value="signUp" checked={this.state.selected === "signUp"} onChange={this.changed.bind(this)} />
                        注 册
                       </label>
                    或
                        <label className={this.state.selected === "signIn" ? 'selected' : ''}>
                        <input type="radio" value="signIn" checked={this.state.selected === "signIn"} onChange={this.changed.bind(this)}
                        />
                        登 录
                        </label>
                </nav>
                <div className="panes">
                    <form className={this.state.selected === "signUp" ? '' : 'hidden'} onSubmit={this.signUp.bind(this)}>
                        <div className='cell emailCell'>
                            <label>邮箱地址</label>
                            <input type="text" value={this.props.formData.email} onChange={this.props.onChange.bind(null, 'email')} placeholder="输入正确的邮箱地址" />
                        </div>
                        <div className='cell'>
                            <label>注册名</label>
                            <input type="text" value={this.props.formData.name} onChange={this.props.onChange.bind(null, 'name')} placeholder="输入注册名" />
                        </div>
                        <div className='cell'>
                            <label>密码</label>
                            <input type="text" value={this.props.formData.pwd} onChange={this.props.onChange.bind(null, 'pwd')} placeholder="输入密码" />
                        </div>
                        <div className='cell action'>
                            <button type='submint'>点击注册</button>
                        </div>
                    </form>
                    <form className={this.state.selected === "signIn" ? '' : 'hidden'} onSubmit={this.signIn.bind(this)}>
                        <div className='cell'>
                            <label>用户名</label>
                            <input type="text" value={this.props.formData.name} onChange={this.props.onChange.bind(null, 'name')} placeholder="点击输入用户名" />
                        </div>
                        <div className='cell signIn'>
                            <label>密码</label>
                            <input type="text" value={this.props.formData.pwd} onChange={this.props.onChange.bind(null, 'pwd')} placeholder="点击输入用户登陆密码" />
                            <div><button type="button" onClick={this.props.onForgetPwd} className='forgetBtn'>忘记密码?</button></div>
                        </div>
                        <div className='cell action'>
                            <button type='submit' >点击登陆</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    changed(e) {
        this.setState({
            selected: e.target.value,
        })
    }
}

export default SignInAndUp