import gql from 'graphql-tag'

const query = gql`
  query activeLobby($updatedAfter: DateTime!, $playerNull: UserFilter) {
    allLobbies(filter: {
      AND: [
        { status: Searching },
        { updatedAt_gte: $updatedAfter}
        { player2: $playerNull },
      ]
    }, orderBy: updatedAt_ASC, first: 1) {
      id
      player1 {
        id
        email
      }
    }
  }
`

export default query
