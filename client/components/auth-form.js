import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {

  const {formName, displayName, handleSubmit, error} = props
  console.log("props in auth", props)

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit} name={formName}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <br/>
        {(formName === "signup") && (
        <div>
          <label htmlFor="name">
            <small>Create Username</small>
          </label>
          <input name="userName" type="userName"/>
        </div>
        )}
        <br/>
        <div>
          <button className="authSubmit" type="submit">{displayName}</button>
        </div>
          <br/>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    formName: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    formName: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {

      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let userName = formName === "signUp" ? evt.target.userName.value : ""
      dispatch(auth(email, password, formName, userName=''))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  formName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
