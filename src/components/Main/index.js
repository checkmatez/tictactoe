import React, { Component } from 'react'

import Gameboard from '../Gameboard'

class Main extends Component {
  constructor(props) {
    super(props)
    this.gameboardSize = Math.min(window.innerHeight, window.innerWidth) * 0.5
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Profile*/}
        <Gameboard size={this.gameboardSize} />
        {/* Chat*/}
      </div>
    )
  }
}

export default Main
