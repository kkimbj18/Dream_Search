import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'

const LogInForm = (props) => {
    const n_name = useRef();
    const passwd = useRef();

    const submit = async () => {
        const formData = {
            n_name: n_name.current.value,
            passwd: passwd.current.value,
        }
        //console.log(formData);
        const result = await props.onSubmit(formData);
        console.log(result.session);

        if(result.fail) window.alert('회원정보가 존재하지않습니다!');
        else if (!result.session.n_name) window.alert('비밀번호가 일치하지 않습니다!');
        else {
            window.sessionStorage.setItem('n_name', result.session.n_name);
            window.sessionStorage.setItem('major', result.session.major);
            window.sessionStorage.setItem('dream', result.session.dream);
            props.onLogIn();
            props.history.push('/');
        }
    }
    const cancel = () => {
        props.history.goBack();
    }

    return (
        <div name="sentMessage" id="contactForm" novalidate>
            <div class="control-group">
                <div class="form-group floating-label-form-group controls">
                    <label>Nick_Name</label>
                    <input type="text" class="form-control" ref={n_name} placeholder="Nick_Name" id="name"/>
                </div>
            </div>
            <div class="control-group">
                <div class="form-group floating-label-form-group controls">
                    <label>Password</label>
                    <input type="password" class="form-control" ref={passwd} placeholder="Password"/>
                    <p class="help-block text-danger"></p>
                </div>
            </div>
            <br />
            <button onClick={() => submit()} class="btn btn-primary" id="sendMessageButton">Send</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => cancel()} class="btn btn-primary" id="sendMessageButton">Cancel</button>
        </div>
    )
}

export default withRouter(LogInForm);