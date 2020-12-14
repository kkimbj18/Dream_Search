import React, { useState, useEffect } from 'react'
import request, { setUserArticle } from '../libs/request'
import { useLocation, withRouter } from 'react-router-dom'
import ArticleS from '../components/ArticleS'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'

const ArticleSpecific = (props) => {
    const location = useLocation();
    const [article] = useState(location.state);
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const [like, setLike] = useState();

    useEffect(() => {
        async function fetchData() {
            let tmp = await request.getUser(window.sessionStorage.getItem('n_name'));
            setUser(tmp);
            let temp = await request.getComments(location.state._id);
            setComments(temp);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            setLike(await user?.likes?.find(id => id === article._id)>-1 ? true : false);
        }
        fetchData();
    }, [user])

    const del = async () => {
        await request.deleteArticle(article._id);

        window.alert('삭제되었습니다!');
        props.history.push('/');
    }

    const doLike = async () => {
        const formData={
            user_id: user._id,
            article_id: article._id
        }
        await request.likeArticle(formData);
        setLike(true);
    }

    const doNotLike = async () => {
        const formData={
            user_id: user._id,
            article_id: article._id
        }
        await request.unlikeArticle(formData);
        setLike(false);
    }

    const setHead = (() => {
        props.headerSet(article);
    })();

    const eventHandle = async () => {
        let temp = await request.getComments(location.state._id);
        setComments(temp);
    }

    return (
        <div class="container">
            <div class="row">

                <div class="col-lg-8 col-md-10 mx-auto">

                    <ArticleS article={article} onDelete={del} user={user} like={like} doLike={doLike} doNotLike={doNotLike} />
                    <div class="card card-outline-secondary my-4">
                        <div class="card-header">
                            Comments
                        </div>
                        <div class="card-body">
                            <CommentList comments={comments} />
                        </div>
                    </div>

                    <CommentForm article={article} onSubmit={request.postComment} onHandle={() => eventHandle()} />

                </div>
            </div>
        </div>
    )
}

export default withRouter(ArticleSpecific);