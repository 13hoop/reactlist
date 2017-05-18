import React, { Component } from 'react'
import './UserDialog.css'
import {signUpLeanCloud, signInLeanCloud} from './LeanCloud'

class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "signUp",
            formData: {
                name: '',
                pwd: ''
            },        
        }
    }
    signUp(e) {
        e.preventDefault()
        console.log('-- 1 ---')
        let {name, pwd} = this.state.formData
        
        let success = (user) => {
            console.log( 'succ ' + user)
            this.props.onSignUp.call(null, user)
        }
        let fail = (error) => {
            console.log('error')
            alert(error)
        }
        signUpLeanCloud(name, pwd, success, fail)
    }
    signIn(e) {
        e.preventDefault()
        let {name, pwd} = this.state.formData
        let success = (user) => {
            console.log( 'succ ' + user)
            this.props.onSignUp.call(null, user)
        }
        let fail = (error) => {
            console.log('error')
            alert(error)
        }    
        signInLeanCloud(name, pwd, success, fail)        
    }
    changeFormData(key, e) {
        console.log('- ' + e.target.value + key )
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        // check is valid here
        // var isEmperty 
        return (
            <div className="dialog_wrapper">
                <div className="dialog">
                    <nav>
                       <label className={this.state.selected === "signUp" ? 'selected' : ''}>
                           <input type="radio" value="signUp" checked={this.state.selected === "signUp"} onChange={this.changed.bind(this)}/>
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
                            <div className='cell'>
                                <label>注册名</label>
                                <input type="text" value={this.state.formData.name} onChange={this.changeFormData.bind(this, 'name')} placeholder="输入注册名"/>
                            </div>
                            <div className='cell'>
                                <label>密码</label>
                                <input type="text" value={this.state.formData.pwd} onChange={this.changeFormData.bind(this, 'pwd')} placeholder="输入密码"/>
                            </div>
                            <div className='cell action'>
                                <button type='submint'>点击注册</button>
                            </div>
                        </form>
                        <form className={this.state.selected === "signIn" ? '' : 'hidden'} onSubmit={this.signIn.bind(this)}>
                            <div className='cell'>
                                <label>用户名</label>
                                <input type="text" value={this.state.formData.name} onChange={this.changeFormData.bind(this, 'name')} placeholder="点击输入用户名"/>
                            </div>
                            <div className='cell'>
                                <label>密码</label>
                                <input type="text" value={this.state.formData.pwd} onChange={this.changeFormData.bind(this, 'pwd')} placeholder="点击输入用户登陆密码"/>
                            </div>
                            <div className='cell action'>
                                <button type='submint'>点击登陆</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    changed(e) {
        // console.log(' -- switch: ' + e.target.value)
        if(e.target.value === 'signUp') {
            console.log(' -- show signUp form --')
        }else {
            console.log(' -- show signIn form --')
        }
        this.setState({
            selected: e.target.value,
            formData: {
                name: '',
                pwd: ''
            }
        })
    }
}

export default UserDialog