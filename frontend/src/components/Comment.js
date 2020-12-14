import React from 'react'
import moment from 'moment'
import Rate from './Rate'

const Comment = ({ comment }) => {
    return (
        <>
            <b class="author">{comment.author.n_name}</b>
            <div>{comment.content}</div>
            <small class="date">{moment(comment.date).format('YYYY-MM-DD, hh:mm')}</small>
            <Rate rating={comment.rating}/>
            <hr />
        </>
    )
}

export default Comment;