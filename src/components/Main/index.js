import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Gameboard from '../Gameboard'
import { Header, Button } from './styled'
import activeLobbyQuery from '../../queries/activeLobby'
import joinExistingLobby from '../../mutations/joinExistingLobby'
import createNewLobby from '../../mutations/createNewLobby'
import waitForLobbyJoin from '../../subscriptions/waitForLobbyJoin'
import { AUTH_USER_ID } from '../../config/constants'

class Main extends Component {
  constructor(props) {
    super(props)
    this.gameboardSize = Math.min(window.innerHeight, window.innerWidth) * 0.5
  }

  state = {
    lookingForOpponent: false,
  }

  _handleLobbyJoin = data => {
    console.log(data.Lobby.node)
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

  _onPlayClick = async e => {
    const lobbyResult = await this.props.client.query({
      query: activeLobbyQuery,
      variables: {
        player2filter: null,
      },
    })
    console.log(lobbyResult)
    if (lobbyResult.data.allLobbies.length === 1) {
      this.props.client
        .mutate({
          mutation: joinExistingLobby,
          variables: {
            lobbyId: lobbyResult.data.allLobbies[0].id,
            playerId: localStorage.getItem(AUTH_USER_ID),
          },
        })
        .then(res => {
          console.log('successfully joined existing lobby')
        })
        .catch(err => console.log('error while joining existing lobby: ', err))
    } else {
      this.props.client
        .mutate({
          mutation: createNewLobby,
          variables: {
            playerId: localStorage.getItem(AUTH_USER_ID),
          },
        })
        .then(result => {
          console.log(this.props.client)
          this._subscribeToLobbyJoin(result.data.createLobby.id)
          // this.props.client
          //   .subscribe({
          //     document: waitForLobbyJoin,
          //     variables: {
          //       lobbyId: result.data.createLobby.id,
          //     },
          //   })
          //   .then(res => {
          //     console.log('sub received:', res)
          //   })
        })
        .catch(err => console.log('some error ', err))
    }

    this.setState({
      lookingForOpponent: true,
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
            <Gameboard size={this.gameboardSize} />
            {this.state.lookingForOpponent
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
