import axios from 'axios'

const API_DEFAULT = "http://localhost:3030/";
const instance = axios.create({ baseURL : API_DEFAULT });

// Root Page
export async function getArticles() {
    const result = await instance.get('/');
    return result.data;
}

// About Articles
export async function createArticle( {title, content, author} ) {
    const result = await instance.post('/article/create', {title, content, author});
    return result.data;
}
export async function getArticle(id) {
    const result = await instance.get('/article/'+id);
    return result.data;
}
export async function getArticlesByMajor(major) {
    const result = await instance.get('/article/major/'+major);
    return result.data;
}
export async function getArticlesByDream(dream) {
    const result = await instance.get('/article/dream/'+dream);
    return result.data;
}
export async function updateArticle( {title, content, _id} ) {
    const result = await instance.put('/article/update/'+_id, {title, content});
    return result.data;
}
export async function deleteArticle( _id ) {
    const result = await instance.delete('/article/delete/'+_id);
    return result.data;
}

// About Users
export async function signUp( {name, n_name, passwd, birth_y, birth_m, region, major, dream} ) {
    const result = await instance.post('/user/signup', {name, n_name, passwd, birth_y, birth_m, region, major, dream});
    return result.data;
}
export async function logIn( {n_name, passwd} ){
    const result = await instance.post('/user/login', {n_name, passwd});
    return result.data;
}
export async function logOut(){
    const result = await instance.get('/user/logout');
    return result.data;
}
export async function getUser(n_name){
    const result = await instance.get('/user/getUser/'+n_name);
    return result.data;
}
export async function setUserArticle({_id, author}){
    const result = await instance.put('/user/article/'+author, {_id});
    return result.data;
}
export async function updateUser({n_name, passwd, region, major, dream}){
    const result = await instance.put('/user/updateUser', {n_name, passwd, region, major, dream});
    return result.data;
}
export async function likeArticle({article_id, user_id}){
    const result = await instance.put('/user/like/'+user_id, {article_id});
    return result.data;
}
export async function unlikeArticle({article_id, user_id}){
    const result = await instance.put('/user/unlike/'+user_id, {article_id});
    return result.data;
}

// About Comments
export async function getComments(id){
    const result = await instance.get('/article/comment/' + id);
    return result.data;
}
export async function postComment( {article, comment, author} ){
    const result = await instance.post('/article/comment' , {article, comment, author});
    return result.data;
}

export default {
    getArticles,
    createArticle,
    getArticle,
    getArticlesByMajor,
    getArticlesByDream,
    updateArticle,
    deleteArticle,
    signUp,
    logIn,
    logOut,
    getUser,
    setUserArticle,
    likeArticle,
    unlikeArticle,
    updateUser,
    getComments,
    postComment
}