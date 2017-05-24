import React, { Component } from 'react'
import './UserDialog.css'
import SignInAndUp from './SignInAndUp'
import ForgetPwd from './ForgetPwd'
import { signUpLeanCloud, signInLeanCloud, sendPasswordResetEmail} from './LeanCloud'


class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signPage',
            formData: {
                email: '',
                name: '',
                pwd: ''
            }
        }
    }
    signUp(user) {
        // console.log(' -- sign Up -- User: ' + JSON.stringify(user))
        this.props.onSignUp.call(null, user)
    }
    signIn(user) {
        // console.log(' -- sign In -- User: ' + JSON.stringify(user))
        this.props.onSignIn.call(null, user)
    }
    changeFormData(key, e) {
        console.log('- (' + key + ') ' + e.target.value)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword() {
        console.log(' -- here restet --')
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgetPwd'
        this.setState(stateCopy)
    }
    resetPassword(e) {
        let validateEmail = function (email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }
        if( validateEmail(this.state.formData.email) ) {
            sendPasswordResetEmail(this.state.formData.email)
        }else {
            alert('请输入正确的邮箱格式')
        }
    }
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signPage'
        this.setState(stateCopy)
    }
    render() {
        return (
            <div className="dialog_wrapper">
                {
                    this.state.selectedTab === "signPage" ?
                        <SignInAndUp
                            formData={this.state.formData}
                            onChange={this.changeFormData.bind(this)}
                            onSignUp={this.signUp.bind(this)}
                            onSignIn={this.signIn.bind(this)}
                            onForgetPwd={this.showForgotPassword.bind(this)}
                        /> :
                        <ForgetPwd
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />
                }
            </div>
        )
    }
}

export default UserDialog