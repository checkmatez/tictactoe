import gql from 'graphql-tag';

const mutation = gql`
  subscription waitForLobbyJoin($lobbyId: ID!) {
    Lobby(filter: {
      AND: [
        { mutation_in: [UPDATED] },
        { updatedFields_contains: "status"},
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
      }
    }
  }
`;

export default mutation;
