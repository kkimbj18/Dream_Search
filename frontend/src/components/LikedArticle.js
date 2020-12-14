import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from '../libs/request'
import moment from 'moment'

const LikedArticle = ({ likedArticle }) => {
    const [article, setArticle] = useState();
    const content = article?.content?.length > 40 ? article?.content?.substr(0, 40) + '...' : article?.content;

    useEffect(() => {
        async function fetchData() {
            console.log(likedArticle);
            let temp = await request.getArticle(likedArticle);
            setArticle(temp);
        }
        fetchData();
    }, []);
    return (
        <>
            <Link to={{
                pathname: "/article/specific/" + likedArticle,
                state: article
            }}>
                <h5 class="mg-0 post-title">{article?.title}</h5></Link>
                <div class="post-content">{content}</div>
                <p class="post-meta">{moment(article?.date).format('YYYY-MM-DD, hh:mm')}
                <span class="float-r">★({article?.rating?article?.rating/2:0})</span></p>
                
            <hr />
        </>
    );
}

export default LikedArticle;