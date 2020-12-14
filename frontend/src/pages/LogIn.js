import React from 'react'
import LogInForm from '../components/LogInForm'
import request from '../libs/request'

const LogIn = (props) => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <LogInForm onSubmit={request.logIn} onLogIn={props.onLogIn} />
                </div>
            </div>
        </div>
    )
}

export default LogIn;