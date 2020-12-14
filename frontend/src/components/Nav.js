import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Nav = (props) => {
  const logOut = async () => {
    await props.onLogOut();
    props.history.push('/');
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <Link class="navbar-brand" onClick={() => { window.location.replace('/') }} >Dream Search</Link>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
            <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          {props.isLogged ?
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link class="nav-link" onClick={() => { window.location.replace('/') }}>Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/profile">Profile</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" onClick={() => logOut()}>Log Out</Link>
              </li>
            </ul>
            :
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link class="nav-link" onClick={() => { window.location.replace('/') }}>Home</Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to="/signup">Sign Up</Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" to="/login">Log In</Link>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Nav);