import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Pagination from './Pagination'
import Article from './Article'
import _ from 'lodash'
import Select from 'react-select'

const List = (props) => {
    const [articles, setArticles] = useState({
        pageSize: 5,
        currentPage: 1
    });
    const { pageSize, currentPage } = articles;
    const count = props.list.length;
    const option = [
        {value:10, label:"날짜 순"},
        {value:11, label:"평점 순"}

    ]
    const posting = () => {
        if (window.sessionStorage.getItem('n_name')) props.history.push('/article/post');
        else {
            window.alert('로그인이 필요합니다!');
            props.history.push('/login');
        }
    }
    function paginate(pageSize, pageNumber) {
        const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

        return _(props.list)
            .slice(startIndex) // 시작점부터 배열을 자르되
            .take(pageSize) // pageSize만큼의 배열을 취함
            .value(); // lodash wrapper 객체를 regular 배열로 변환
    }
    const handlePageChange = (page) => {
        setArticles({ ...articles, currentPage: page });
    };
    const pagedArticles = paginate(pageSize, currentPage);
    return (
        <>
            <Select onChange={props.onHandle} options={option}/>
            {pagedArticles.map(article =>
                <Article article={article} />
            )}
            <div class="fit">
                <button class="btn btn-outline-primary float-right" onClick={() => posting()}>Post &rarr;</button>
                <Pagination
                    pageSize={pageSize}
                    itemsCount={count}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </>
    )
}

export default withRouter(List);