import gql from 'graphql-tag'

const mutation = gql`
  mutation joinExistingLobby($lobbyId: ID!, $playerId: ID!) {
    updateLobby(id: $lobbyId, player2Id: $playerId, status: Found) {
        id
      }
  }
`

export default mutation
