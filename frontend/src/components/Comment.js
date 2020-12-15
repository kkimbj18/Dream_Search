import React from 'react'
import moment from 'moment'
import Rate from './Rate'

const Comment = (props) => {
    const {comment} = props;
    return (
        <>
            <b class="author">{comment.author.n_name}</b>
            <div>{comment.content}</div>
            <small class="date">{moment(comment.date).format('YYYY-MM-DD, hh:mm')}</small>
            <Rate rating={comment.rating}/>
            { comment.author.n_name===window.sessionStorage.getItem('n_name') &&
                <button class="float-r btn btn-sm" onClick={() => props.onDelete(comment._id)}>삭제</button>
            }
            <hr />
        </>
    )
}

export default Comment;