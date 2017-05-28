import gql from 'graphql-tag'

const mutation = gql`
  mutation makeMove($gameId: ID!, $square: Int!, $mark: MOVE_MARK!) {
    createMove(gameId: $gameId, square: $square, mark: $mark) {
      id
      square
      mark
    }
  }
`

export default mutation
