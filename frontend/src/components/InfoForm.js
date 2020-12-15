import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

const InfoForm = (props) => {
    const [opt, setOpt] = useState(false);
    const [major, setMajor] = useState();
    const [dream, setDream] = useState();
    const name = useRef();
    const n_name = useRef();
    const passwd = useRef();
    const birth = useRef();
    const region = useRef();

    const majorOpt = [
        { value: 'Computer Engineering', label: 'Computer Engineering' },
        { value: 'Cyber Security', label: 'Cyber Security' },
        { value: 'Department of Economics', label: 'Department of Economics' },
    ]

    const dreamOpt = [
        { value: 'Big Data Expert', label: 'Big Data Expert' },
        { value: 'Front-end Developer', label: 'Front-end Developer'},
        { value: 'Back-end Developer', label: 'Back-end Developer' }
    ]

    const defaultObject = [majorOpt.find(major => major.value === props.info?.major),
        dreamOpt.find(dream => dream.value === props.info?.dream)];

    useEffect(()=>{
        setMajor(defaultObject[0]);
        setDream(defaultObject[1]);
    },[props.info])

    useEffect(()=>{
        props.info?
            setOpt(true)
            :
            setOpt(false)
    },[])

    const onChangeMajor = (e) => {
        setMajor(e);
    }
    const onChangeDream = (e) => {
        setDream(e);
    }

    const submit = async () => {
        const birth_y = birth.current.value.split("-")?.[0];
        const birth_m = birth.current.value.split("-")?.[1];

        const formData = {
            name: name.current.value,
            n_name: n_name.current.value,
            passwd: passwd.current.value,
            birth_y: birth_y,
            birth_m: birth_m,
            region: region.current.value,
            major: major.value,
            dream: dream.value
        }
        const result = await props.onSubmit(formData);

        if (result.success === true && !props.info) props.history.push('/login');
        else if(result.success === true && props.info) {
            window.alert('변경이 완료되었습니다!');
        }
        else window.alert('닉네임이 중복되었습니다!');
    }
    const cancel = () => {
        props.history.goBack();
    }

    return (
        props.info ?
        
        <div name="sentMessage" id="contactForm" novalidate>    
            <div class="control-group">
            <label>Name</label>
                <div class="form-group controls">
                    
                    <input type="text" class="form-control" ref={name} disabled={opt} value={props.info.name}  />
                </div>
            </div>
            <div class="control-group">
            <label>Nick_Name</label>
                <div class="form-group controls">
                    
                    <input type="text" class="form-control" ref={n_name} value={props.info.n_name}/>
                </div>
            </div>
            <div class="control-group">
            <label>Password</label>
                <div class="form-group controls">
                    
                    <input type="password" class="form-control" ref={passwd}/>
                </div>
            </div>
            <div class="control-group">
            <label>Birth</label>
                <div class="form-group controls">
                    
                    <input type="month" class="form-control" ref={birth} disabled={opt} value={props.info.birth_y+"-"+props.info.birth_m}/>
                </div>
            </div>
            <div class="control-group">
            <label>Region</label>
                <div class="form-group controls">
                    
                    <input type="text" class="form-control" ref={region} value={props.info.region}/>
                </div>
            </div>
            <div class="control-group">
            <label>Major</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <Select onChange={onChangeMajor} options={majorOpt} value={major}/>
                    <p class="help-block text-danger"></p>
                </div>
            </div>
            <div class="control-group">
            <label>Dream</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <Select onChange={onChangeDream} options={dreamOpt} value={dream}/>
                    <p class="help-block text-danger"></p>
                </div>
            </div>
            <br />
            <div id="success"></div>
            <button onClick={() => submit()} class="btn btn-primary">Send</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => cancel()} class="btn btn-primary">Cancel</button>
        </div>
            :

        <div name="sentMessage" id="contactForm" novalidate>
            <div class="control-group">
            <label>Name</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <input type="text" class="form-control" ref={name} disabled={opt}  />
                </div>
            </div>
            <div class="control-group">
            <label>Nick_Name</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <input type="text" class="form-control" ref={n_name} />
                </div>
            </div>
            <div class="control-group">
            <label>Password</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <input type="password" class="form-control" ref={passwd} />
                </div>
            </div>
            <div class="control-group">
            <label>Birth</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <input type="month" class="form-control" ref={birth} disabled={opt} />
                </div>
            </div>
            <div class="control-group">
            <label>Region</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <input type="text" class="form-control" ref={region} />
                </div>
            </div>
            <div class="control-group">
            <label>Major</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <Select onChange={onChangeMajor} options={majorOpt}/>
                    <p class="help-block text-danger"></p>
                </div>
            </div>
            <div class="control-group">
            <label>Dream</label>
                <div class="form-group floating-label-form-group controls">
                    
                    <Select onChange={onChangeDream} options={dreamOpt}/>
                    <p class="help-block text-danger"></p>
                </div>
            </div>
            <br />
            <div id="success"></div>
            <button onClick={() => submit()} class="btn btn-primary">Send</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => cancel()} class="btn btn-primary">Cancel</button>
        </div>
    )
}

export default withRouter(InfoForm);