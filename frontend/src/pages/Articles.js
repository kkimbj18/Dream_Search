import React, { useState, useEffect } from 'react'
import request from '../libs/request'
import List from '../components/List'
import SideNav from '../components/SideNav'
import SearchBar from '../components/SearchBar'

const Articles = () => {
    const [list, setList] = useState([]);
    const [opt, setOpt] = useState(0);

    const optHandler = (option) => {
        setOpt(option);
    }
    const filterHandler = (e) => {
        setOpt(e.value);
    }

    const submit = (option, input) => {
        switch(option)
        {
            case "title":
                setList(list.filter(article => !article.title.indexOf(input)));
                break;
            case "content":
                setList(list.filter(article => !article.content.indexOf(input)));
                break;
            case "author":
                setList(list.filter(article => !article.author.n_name.indexOf(input)));
                break;
            case "major":
                setList(list.filter(article => !article.major.indexOf(input)));
                break;
            case "dream":
                setList(list.filter(article => !article.dream.indexOf(input)));
                break;
        }
    }

    useEffect(() => {
        async function fetchData() {
            let articleList = await request.getArticles();
            setList(articleList);
        }
        fetchData();
    }, []);

    useEffect(()=>{
        async function fetchData() {
            let articleList;
            console.log(opt);
            switch(opt)
            {
                case 0:
                    articleList = await request.getArticles();
                    setList(articleList);
                    break;
                case 1:
                    articleList = await request.getArticlesByMajor(window.sessionStorage.getItem('major'));
                    setList(articleList);
                    break;
                case 2:
                    articleList = await request.getArticlesByDream(window.sessionStorage.getItem('dream'));
                    setList(articleList);
                    break;
                case 10:
                    setList(list.sort((a,b)=>{
                        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
                    }));
                    break;
                case 11:
                    setList(list.sort((a,b)=>{
                        return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0
                    }))
                    break;
                default:
                    articleList = await request.getArticles();
                    setList(articleList);
            }
        }
        fetchData();
    }, [opt])

    return (
        <div class="container">
            <div class="row">

                <SideNav onHandle={optHandler} />

                <div class="col-lg-8 col-md-10 mx-auto">

                    <List list={list} onHandle={filterHandler}/>
                    <SearchBar onSubmit={submit}/>

                </div>
            </div>
        </div>
    )
}

export default Articles;