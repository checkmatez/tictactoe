import gql from 'graphql-tag'

const mutation = gql`
  mutation makeAMove($lobbyId: ID!, $playerId: ID!) {
    updateLobby(id: $lobbyId, player2Id: $playerId) {
      id
    }
  }
`

export default mutation
