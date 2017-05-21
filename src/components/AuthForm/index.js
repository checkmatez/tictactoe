import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import PresentationalForm from './PresentationalForm'
import loginMutation from '../../mutations/login'
import signupMutation from '../../mutations/signup'
import currentUserQuery from '../../queries/currentUser'
import { AUTH_TOKEN_KEY, AUTH_USER_ID } from '../../config/constants'

class AuthForm extends Component {
  _onSubmit = async ({ email, password }) => {
    const { login, signup, history } = this.props
    try {
      const result = await login({ email, password })
      localStorage.setItem(AUTH_TOKEN_KEY, result.data.signinUser.token)
      localStorage.setItem(AUTH_USER_ID, result.data.signinUser.user.id)
      history.push('/game')
    } catch (error) {
      try {
        console.log(error)
        const res = await signup({ email, password })
        try {
          const result = await login({ email, password })
          localStorage.setItem(AUTH_TOKEN_KEY, result.data.signinUser.token)
          localStorage.setItem(AUTH_USER_ID, result.data.signinUser.user.id)
          history.push('/game')
        } catch (error) {
          console.log('error while login in: ', error)
        }
      } catch (error) {
        console.log('error while signing up: ', error)
      }
    }
  }

  render() {
    return <PresentationalForm onSubmit={this._onSubmit} />
  }
}

const loginConfig = {
  props: ({ mutate }) => ({
    login: ({ email, password }) => {
      return mutate({
        variables: { auth: { email, password } },
        refetchQueries: [{ query: currentUserQuery }],
      })
    },
  }),
}

const signupConfig = {
  props: ({ mutate }) => ({
    signup: ({ email, password }) => {
      return mutate({
        variables: { authSignup: { email: { email, password } } },
        refetchQueries: [{ query: currentUserQuery }],
      })
    },
  }),
}

export default compose(
  graphql(loginMutation, loginConfig),
  graphql(signupMutation, signupConfig)
)(AuthForm)
