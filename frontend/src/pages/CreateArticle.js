import React from 'react'
import request from '../libs/request'
import ArticleForm from '../components/ArticleForm'

const CreateArticle = () => {
    return(
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <h3 class="mg-bottom-3">Post Article</h3>
                    <ArticleForm onSubmit={request.createArticle} />
                </div>
            </div>
        </div>



        
    )
}

export default CreateArticle;