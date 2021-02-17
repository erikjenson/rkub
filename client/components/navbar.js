import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Route} from 'react-router-dom'
import {logout} from '../store'


const Navbar = ({handleClick, isLoggedIn}) => {
  function Hero(){
    return( <div className="hero"><a href="/login"><img src="https://m.media-amazon.com/images/S/aplus-media/vc/471abed2-4eea-481b-85ae-9ef4fd245ffe._CR0,0,220,220_PT0_SX220__.png" /> </a> </div>)
    }
  function Logout(){
    return (
    <div className="logout">
      <h3>Sure you wanna to do this?</h3>
      <div>
        <NavLink to="/home">Nah.</NavLink>
        <a href="#" type="button" onClick={handleClick}>Yup.</a>
      </div>
    </div>)}
  return(
  <div>
    <h1 className="navHead">Electronic Rummikub</h1>
    <nav className="navBar">
      {isLoggedIn ? (
        <div >
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home" activeClassName="active">Home</NavLink>
          <NavLink to="/start-game" activeClassName="active">Start</NavLink>
          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/login" activeClassName="active">Login</NavLink>
          <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
        </div>
      )}
    </nav>
    <hr />
    <Route exact path="/" component={Hero} />
    <Route path="/logout" component={Logout} />
  </div>
)}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
