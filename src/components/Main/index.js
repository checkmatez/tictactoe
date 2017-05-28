import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Gameboard from '../Gameboard'
import { Header, Button } from './styled'
import activeLobbyQuery from '../../queries/activeLobby'
import joinExistingLobby from '../../mutations/joinExistingLobby'
import createNewLobby from '../../mutations/createNewLobby'
import makeAMove from '../../mutations/makeAMove'
import waitForLobbyJoin from '../../subscriptions/waitForLobbyJoin'
import waitForNewMove from '../../subscriptions/waitForNewMove'
import { AUTH_USER_ID } from '../../config/constants'

class Main extends Component {
  constructor(props) {
    super(props)
    this.gameboardSize = Math.min(window.innerHeight, window.innerWidth) * 0.5
  }

  state = {
    lobbyStatus: 'Inactive',
    gameField: Array(9).fill(false),
    gameStatus: null,
    currentGameId: null,
    ownTurn: false,
    ownMark: 'X',
    opponent: null,
  }

  _handleLobbyJoin = ({ Lobby: { node } }) => {
    this._unsubscribeFromLobbyJoin()
    this._subscribeToNewMoves(node.id)
    this.setState({
      lobbyStatus: 'Found',
      gameField: Array(9).fill(false),
      gameStatus: 'InProgress',
      currentGameId: node.games[0].id,
      ownTurn: true,
      ownMark: 'X',
      opponent: {
        email: node.player2.email,
      },
    })
  }

  _handleNewMove = ({ Move: { node } }) => {
    this.setState(prevState => {
      const newState = {}
      if (prevState.gameField[node.square] !== node.mark) {
        const gameField = [...prevState.gameField]
        gameField.splice(node.square, 1, node.mark)
        newState.gameField = gameField
      }
      if (prevState.currentGameId !== node.game.id) {
        newState.currentGameId = node.game.id
      }
      if (node.mark !== prevState.ownMark) {
        newState.ownTurn = !prevState.ownTurn
      }
      return newState
    })
  }

  _subscribeToLobbyJoin = lobbyId => {
    this.newLobbyObserver = this.props.client
      .subscribe({
        query: waitForLobbyJoin,
        variables: {
          lobbyId,
        },
      })
      .subscribe({
        next: this._handleLobbyJoin,
        error(err) {
          console.error(err)
          this._subscribeToLobbyJoin(lobbyId)
        },
      })
  }

  _unsubscribeFromLobbyJoin = () => {
    if (this.newLobbyObserver) {
      this.newLobbyObserver.unsubscribe()
    }
  }

  _subscribeToNewMoves = lobbyId => {
    this.newMoveObserver = this.props.client
      .subscribe({
        query: waitForNewMove,
        variables: {
          lobbyId,
        },
      })
      .subscribe({
        next: this._handleNewMove,
        error(err) {
          console.error(err)
          this._subscribeToNewMoves(lobbyId)
        },
      })
  }

  _createNewLobby = () => {
    return this.props.client.mutate({
      mutation: createNewLobby,
      variables: {
        playerId: localStorage.getItem(AUTH_USER_ID),
      },
    })
  }

  _joinExistingLobby = lobbyId => {
    return this.props.client.mutate({
      mutation: joinExistingLobby,
      variables: {
        lobbyId,
        playerId: localStorage.getItem(AUTH_USER_ID),
      },
    })
  }

  _onPlayClick = async e => {
    this.setState({
      lobbyStatus: 'Searching',
    })
    const lobbyResult = await this.props.client.query({
      query: activeLobbyQuery,
      variables: {
        player2filter: null,
      },
    })
    if (lobbyResult.data.allLobbies.length === 0) {
      try {
        const newLobbyResult = await this._createNewLobby()
        this._subscribeToLobbyJoin(newLobbyResult.data.createLobby.id)
      } catch (error) {
        console.error(error)
      }
    } else {
      const lobbyId = lobbyResult.data.allLobbies[0].id
      try {
        const exisingLobbyResult = await this._joinExistingLobby(lobbyId)
        this._subscribeToNewMoves(lobbyId)
        this.setState({
          lobbyStatus: 'Found',
          gameField: Array(9).fill(false),
          gameStatus: 'InProgress',
          currentGameId: exisingLobbyResult.data.updateLobby.games[0].id,
          ownTurn: false,
          ownMark: 'O',
          opponent: {
            email: lobbyResult.data.allLobbies[0].player1.email,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  _makeMove = square => {
    return this.props.client.mutate({
      mutation: makeAMove,
      variables: {
        gameId: this.state.currentGameId,
        square,
        mark: this.state.ownMark,
      },
    })
  }

  _handleSquareClick = async (index, event) => {
    if (event.evt.button !== 0) {
      return
    }
    if (this.state.gameField[index] || this.state.gameStatus !== 'InProgress') {
      return
    }

    this._makeMove(index)

    this.setState(prevState => {
      const gameField = [...prevState.gameField]
      gameField.splice(index, 1, prevState.ownMark)
      return {
        gameField,
      }
    })
  }

  render() {
    return (
      <div>
        <Header>
          Крестики-нолики
        </Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Profile*/}
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              flex: `0 0 ${this.gameboardSize}px`,
            }}
          >
            <Gameboard
              size={this.gameboardSize}
              gameField={this.state.gameField}
              onSquareClick={this._handleSquareClick}
            />
            {this.state.lobbyStatus === 'Searching'
              ? <p>ищем достойного противника...</p>
              : <Button onClick={this._onPlayClick}>
                  Играть
                </Button>}
          </div>
          {/* Chat*/}
        </div>
      </div>
    )
  }
}

export default withApollo(Main)
