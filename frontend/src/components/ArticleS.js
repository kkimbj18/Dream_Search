import React from 'react'
import {Link} from 'react-router-dom'

const ArticleS = (props) => {
  return (
    <div class="card mt-4">

      <div class="card-body">
        {props.article?.author?.n_name === window.sessionStorage.getItem('n_name') &&
          <>
            <button class="float-r btn btn-sm" onClick={() => props.onDelete()}>삭제</button>
            <Link class="float-r btn btn-sm" to={'/article/edit/'+props.article._id}>수정</Link>
          </>
        }
        <h4 class="card-title">{props?.article?.title}</h4>
        <hr />
        <p class="card-text content">{props?.article?.content}</p>
        {props.like && window.sessionStorage.getItem('n_name') &&
          <Link class="float-r empty-heart" onClick={()=>props.doNotLike()}></Link>
        }
        {!props.like && window.sessionStorage.getItem('n_name') &&
          <Link class="float-r heart" onClick={()=>props.doLike()}></Link>
        }
      </div>
    </div>
  )
}

export default ArticleS;