import React from 'react'
import Comment from './Comment'

const CommentList = (props) => {
    
    return (
        props?.comments?.length > 0?
        <>
              {console.log(props.comments)}
              {
                  props.comments.map(comment=>
                      <Comment comment={comment} onDelete={props.onDelete} />
                  )
              }
              </>
        :
        null
    )
}
export default CommentList;