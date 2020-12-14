import React from 'react'
import InfoForm from '../components/InfoForm'
import request from '../libs/request'

const SignUp = () => {
    return(
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <InfoForm onSubmit={request.signUp}/>
                </div>
            </div>
        </div>
    )
}

export default SignUp;