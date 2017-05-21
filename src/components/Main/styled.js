import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: teal;
  color: white;
  font-family: 'Dancing Script', cursive;
  width: 100%;
  height: 2rem;
  box-shadow: 0 8px 6px -6px black;
  margin-bottom: 3rem;
`
export const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 10px;
  margin: 10px auto;
  min-width: 80%;
`
