import gql from 'graphql-tag'

const mutation = gql`
  subscription waitForNewMove($lobbyId: ID!) {
    Move(filter: {
      AND: [
        {mutation_in: [CREATED]},
        {node: {
          game: {
            lobby: {
              id: $lobbyId
            }
          }
        }}
      ]
    }) {
      node {
        id
        square
        mark
        game {
          id
        }
      }
    }
  }
`

export default mutation
