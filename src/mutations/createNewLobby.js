import gql from 'graphql-tag'

const mutation = gql`
  mutation createNewLobby($playerId: ID!) {
    createLobby(player1Id: $playerId) {
      id
    }
  }
`

export default mutation
