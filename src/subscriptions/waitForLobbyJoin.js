import gql from 'graphql-tag'

const mutation = gql`
  subscription waitForLobbyJoin($lobbyId: ID!) {
    Lobby(filter: {
      AND: [
        { mutation_in: [UPDATED] },
        { updatedFields_contains: "player2"},
        { node: {
          id: $lobbyId
        }}
      ]
    }) {
      node {
        id
        updatedAt
        player2 {
          id
          email
        }
      }
    }
  }
`

export default mutation
