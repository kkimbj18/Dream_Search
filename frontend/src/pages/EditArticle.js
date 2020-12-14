import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import request from '../libs/request'
import ArticleForm from '../components/ArticleForm'

const EditArticle = () => {
    const id = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        async function fetchData() {
            let temp = await request.getArticle(id.id);
            setArticle(temp);
        }
        fetchData();
    }, [])

    return (
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <h3 class="mg-bottom-3">Edit Article</h3>
                    <ArticleForm article={article} onSubmit={request.updateArticle} />
                </div>
            </div>
        </div>
    )
}

export default EditArticle;