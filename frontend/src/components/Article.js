import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Article = (props) => {
  const { article } = props;
  const content = article.content.length > 40 ? article.content.substr(0, 40) + '...' : article.content;
  return (
    <div class="post-preview">
      <Link to={{
        pathname: `/article/specific/${article._id}`,
        state: article
      }}>
        <h2 class="post-title">
          {article.title}
        </h2>
        <h5 class="post-content">
          {content}
        </h5>
      </Link>
      <p class="post-meta">
        Posted by <Link to="/">{article.author.n_name}</Link> on {moment(article.date).format('YYYY-MM-DD, hh:mm')}
    <span class="float-r">★({article.rating?article.rating/2:0})</span>
    <div><i class="s-9">About {article.major}/{article.dream}</i> </div>
      </p>
      <span class="text-warning">
      </span>
      <hr />
    </div>
  )
}

export default Article;