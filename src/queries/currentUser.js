import gql from 'graphql-tag'

const query = gql`
  query {
    user {
      id
      email
    }
  }
`

export default query
