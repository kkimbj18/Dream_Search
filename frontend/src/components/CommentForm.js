import React, { useRef, useState } from 'react'
import Star from './Star'
import {withRouter} from 'react-router-dom'

const CommentForm = (props) => {
    const [idx, setIdx] = useState(0);
    const [rating, setRating] = useState(0);
    const [cacheIdx, setCacheIdx] = useState(0);
    const [cacheRating, setCacheRating] = useState(0);

    const content = useRef();

    const _mouseOver = (e, i) => {
        e.persist()
        let offsetX = e.nativeEvent.offsetX;
        let clientX = e.target.clientWidth;

        if (offsetX > clientX / 2) {
            let value = 2;
            setIdx(i);
            setRating(value);
        } else {
            let value = 1;
            setIdx(i);
            setRating(value);
        }
    }

    const handleChange = (i, v) => {
        setIdx(0);
        setRating(0);
        setCacheIdx(i);
        setCacheRating(v);
    }

    const resetComment = () => {
        setCacheIdx(0);
        setCacheRating(0);
        content.current.value = '';
    }

    const submit = async () => {
        if (!window.sessionStorage.getItem('n_name')) {
            window.alert('로그인이 필요합니다!');
            props.history.push('/login');
        }
        else {
            const comment = {
                content: content.current.value,
                rating: cacheIdx + cacheRating
            }
            const formData = {
                article: props.article,
                comment: comment,
                author: props.article.author
            }
            resetComment();
            console.log(formData);
            await props.onSubmit(formData);
            props.onHandle();
        }
    }

    return (
        <div class="control-group">
            <div class="form-group controls">
                <textarea class="form-control" cols="50" rows="3" ref={content} placeholder="Comment" />
                <p class="help-block text-danger"></p>
            </div>
            <span>
                <button onClick={() => submit()} class="btn btn-primary" id="sendMessageButton">Comment</button>
                <Star
                    _mouseOver={_mouseOver}
                    onChange={handleChange}
                    idx={idx}
                    rating={rating}
                    cacheIdx={cacheIdx}
                    cacheRating={cacheRating} />
            </span>
        </div>
    )
}

export default withRouter(CommentForm);