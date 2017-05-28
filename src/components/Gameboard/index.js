import React, { Component } from 'react'
import { Stage, Layer, Line } from 'react-konva'

import { GAMEBOARD_ROWS_COUNT } from '../../config/constants'
import Square from '../Square'

class GameBoard extends Component {
  _onSquareClick = (index, event) => {
    this.props.onSquareClick(index, event)
  }

  _renderLines = () => {
    const lines = []
    const color = 'grey'
    const strokeWidth = 10
    const cellWidth = this.props.size / GAMEBOARD_ROWS_COUNT

    for (let i = 1; i < GAMEBOARD_ROWS_COUNT; i++) {
      let position = cellWidth * i
      lines.push(
        <Line
          points={[position, 0, position, this.props.size]}
          stroke={color}
          strokeWidth={strokeWidth}
          key={i + 'v'}
        />
      )
      lines.push(
        <Line
          points={[0, position, this.props.size, position]}
          stroke={color}
          strokeWidth={strokeWidth}
          key={i + 'h'}
        />
      )
    }
    return lines
  }

  _renderSquares = () => {
    const cellWidth = this.props.size / GAMEBOARD_ROWS_COUNT
    const coordinates = []

    for (let y = 0; y < GAMEBOARD_ROWS_COUNT; y++) {
      for (let x = 0; x < GAMEBOARD_ROWS_COUNT; x++) {
        coordinates.push([x * cellWidth, y * cellWidth])
      }
    }

    return coordinates.map((coord, index) => (
      <Square
        index={index}
        key={index}
        xPos={coord[0]}
        yPos={coord[1]}
        cellWidth={cellWidth}
        mark={this.props.gameField[index]}
        fill={'black'}
        onClick={this._onSquareClick.bind(this, index)}
      />
    ))
  }

  render() {
    const { size } = this.props
    return (
      <Stage width={size} height={size}>
        <Layer>
          {this._renderLines()}
        </Layer>
        <Layer>
          {this._renderSquares()}
        </Layer>
      </Stage>
    )
  }
}

export default GameBoard
