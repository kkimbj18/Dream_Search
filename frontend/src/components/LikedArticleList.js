import React from 'react'
import LikedArticle from './LikedArticle';

const LikedArticleList = (props) => {
    return (
        <div class="card mt-4">
            <div class="card-header">
                Liked Articles
            </div>
            <div class="card-body post-preview">

                {props.data.likes.map(likedArticle =>

                    <LikedArticle likedArticle={likedArticle} />
                )
                }
            </div>
        </div>
    )
}

export default LikedArticleList;