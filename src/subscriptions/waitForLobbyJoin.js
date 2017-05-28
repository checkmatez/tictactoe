import gql from 'graphql-tag'

const mutation = gql`
  subscription waitForLobbyJoin($lobbyId: ID!) {
    Lobby(filter: {
      AND: [
        { mutation_in: [UPDATED] },
        { node: {
          id: $lobbyId
        }}
      ]
    }) {
      node {
        id
        updatedAt
        status
        player2 {
          id
          email
        }
        games(last: 1) {
          id
        }
      }
    }
  }
`

export default mutation
