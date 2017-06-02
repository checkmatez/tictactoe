import gql from 'graphql-tag'

export default gql`
  mutation setGameResult($gameId: ID!, $status: GAME_STATUS!) {
    updateGame(id: $gameId, status: $status) {
      id
      status
    }
  }
`
