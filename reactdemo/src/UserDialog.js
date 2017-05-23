import React, { Component } from 'react'
import './UserDialog.css'
import SignInAndUp from './SignInAndUp'
class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "signIn",
            formData: {
                name: '',
                pwd: ''
            },
        }
    }
    signUp(e, user) {
        console.log(' -- sign Up -- UD')
        this.props.onAciton.call(null, user)
    }
    signIn(e, user) {
        console.log(' -- sign In -- User: ' + JSON.stringify(user))
        this.props.onAction.call(null, user)
    }
    changeFormData(key, e) {
        console.log('- ' + e.target.value + key)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        // check is valid here
        // var isEmperty 
        return (
            <SignInAndUp onChange={this.changeFormData.bind(this)} onSignUp={this.signUp.bind(this)} onSignIn={this.signIn.bind(this)}></SignInAndUp>
            // <SignInAndUp></SignInAndUp>
        )
    }
}

export default UserDialog