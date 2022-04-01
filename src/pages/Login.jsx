import React, { Component } from 'react'
import Footer from '../components/share/Footer'
import GuestNavbar from '../components/share/GuestNavBar'
import LoginForm from '../components/loginpage/LoginForm'



class Login extends Component {
    /**
     * Navigate
     * @param {*} val 
     */
    Navigate = (val) => {
        this.props.history.push(val)
    }
    componentDidMount() {
    }

    /**
     * Login Page
     * @returns Login Page
     */
    render() {
        return (
            <div>
                <GuestNavbar />
                <LoginForm Navigate={this.Navigate} />
                <Footer />
            </div>
        )
    }
}
export default Login