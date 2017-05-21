import gql from 'graphql-tag'

const query = gql`
  query activeLobby($player2filter: UserFilter) {
    allLobbies(filter: {
      player2: $player2filter
    }, orderBy: createdAt_ASC, first: 1) {
      id
      player1 {
        id
        email
      }
    }
  }
`

export default query
