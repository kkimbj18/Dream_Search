import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Articles from './Articles'
import LogIn from './LogIn'
import SignUp from './SignUp'
import CreateArticle from './CreateArticle'
import EditArticle from './EditArticle'
import ArticleSpecific from './ArticleSpecific'
import request from '../libs/request'
import Profile from './Profile';


const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [article, setArticle] = useState();

  const onLogIn = () => {
    setIsLogged(true);
  }
  const onLogOut = async () => {

    await request.logOut();

    setIsLogged(false);
    window.sessionStorage.clear();
  }
  const headerSet = (article) => {
    setArticle(article);
  }
  useEffect(() => {
    const n_name = window.sessionStorage.getItem('n_name');
    if (n_name) onLogIn();
    else onLogOut();
  }, []);

  return (
    <Router>
      <Nav isLogged={isLogged} onLogOut={onLogOut} onLogIn={onLogIn} />
      <Header article={article}/>
      <Switch>
        <Route exact path='/' component={Articles} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/article/post' component={CreateArticle} />
        <Route exact path='/article/edit/:id' component={EditArticle} />
        <Route exact path='/login' render={() => <LogIn onLogIn={onLogIn} />} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='/article/specific/:id' render={() => <ArticleSpecific headerSet={headerSet}/>} />
      </Switch>
      <Footer />
    </Router>
  )
}



export default App;
