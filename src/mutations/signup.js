import gql from 'graphql-tag'

export default gql`
  mutation signup($authSignup: AuthProviderSignupData!){
    createUser(authProvider: $authSignup) {
      id
      email
    }
  }
`
