import React, { useState, useRef, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import request from '../libs/request'

const ArticleForm = (props) => {
    const title = useRef();
    const content = useRef();
    const [author, setAuthor] = useState();

    useEffect(()=>{
        async function fetchData(){
            const user = await request.getUser(window.sessionStorage.getItem('n_name'));
            setAuthor(user);
        }
        fetchData();
    },[])
    
    const submit = async() => {
        const formData = {
            title : title.current.value,
            content : content.current.value,
            author : author,
            _id : props.article?._id
        }
        console.log(formData);
        const article = await props.onSubmit(formData);
        if(props.article);
        else
          await request.setUserArticle(article);

        props.history.push('/');
    }
    const cancel = () => {
        props.history.goBack();
    }
    return(
        <div name="sentMessage" id="contactForm" novalidate>
          <div class="control-group">
            <div class="form-group controls">
              <label>Title</label>
              <input type="text" class="form-control" ref={title} id="name" defaultValue={props.article?.title}/>
            </div>
          </div>
          <div class="control-group">
            <div class="form-group controls">
              <label>Content</label>
              <textarea class="form-control" cols="50" rows="5" ref={content} defaultValue={props.article?.content}/>
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <br />
          <div id="success"></div>
          <button onClick={()=>submit()} class="btn btn-primary" id="sendMessageButton">Send</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={()=>cancel()} class="btn btn-primary" id="sendMessageButton">Cancel</button>
        </div>
    )
}

export default withRouter(ArticleForm);