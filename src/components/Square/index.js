import React from 'react'
import { Text } from 'react-konva'

const Square = ({ index, xPos, yPos, cellWidth, mark, fill, onClick }) => {
  return (
    <Text
      index={index}
      x={xPos}
      y={yPos}
      fontSize={cellWidth}
      width={cellWidth}
      text={mark}
      fill={fill}
      fontFamily="Helvetica"
      align="center"
      onClick={onClick}
    />
  )
}

export default Square
