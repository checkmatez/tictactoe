import gql from 'graphql-tag'

export default gql`
  mutation login($auth: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $auth) {
      token
      user {
        id
        email
      }
    }
  }
`
