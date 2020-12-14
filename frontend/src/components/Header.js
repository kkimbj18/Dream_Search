import React from 'react'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const Header = ({ article }) => {

    const location = useLocation().pathname;

    return (
        <header class="masthead" id="home">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <div class="site-heading">
                            {location === '/login' &&
                                <>
                                    <h1>Login</h1>
                                    <span class="subheading">로그인하셈ㅋ</span>
                                </>
                            }
                            {location === '/' &&
                                <>
                                    <h1>Articles</h1>
                                    <span class="subheading">게시물들임ㅋ</span>
                                </>
                            }
                            {location === '/signup' &&
                                <>
                                    <h1>Sign Up</h1>
                                    <span class="subheading">가입하셈ㅋ</span>
                                </>
                            }
                            {location === '/profile' &&
                                <>
                                    <h1>{window.sessionStorage.getItem('n_name')}</h1>
                                    <span class="subheading">프로필임ㅋ</span>
                                </>
                            }
                            {location === '/article/post' &&
                                <>

                                    <h1>Posting</h1>
                                    <span class="subheading">올리셈ㅋ</span>

                                </>
                            }
                            {location.indexOf('/article/specific') !== -1 &&
                                article ?
                                <>
                                    <h1>{article.title}</h1>
                                    <span class="meta">Posted by {article.author.n_name} on {moment(article.date).format('YYYY-MM-DD, hh:mm')}</span>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;