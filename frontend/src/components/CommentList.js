import React from 'react'
import Comment from './Comment'

const CommentList = ({comments}) => {
    
    return (
        comments?
        <>
              {console.log(comments)}
              {
                  comments.map(comment=>
                      <Comment comment={comment} />
                  )
              }
              </>
        :
        null
    )
}
export default CommentList;