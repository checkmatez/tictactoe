import gql from 'graphql-tag'

const mutation = gql`
  mutation joinExistingLobby($lobbyId: ID!, $playerId: ID!) {
    updateLobby(id: $lobbyId, player2Id: $playerId, status: Found, games: [{}], test: "waiting for subscriptions to work on not scalar types") {
      id
      games(first: 1) {
        id
      }
    }
  }
`

export default mutation
