import React from 'react'
import MyArticle from './MyArticle';

const MyArticleList = (props) => {
    return (
        <div class="card mt-4">
            <div class="card-header">
                My Articles
            </div>
            <div class="card-body post-preview">

                {props.data.articles.map(myArticle =>

                    <MyArticle myArticle={myArticle} />
                )
                }
            </div>
        </div>
    )
}

export default MyArticleList;