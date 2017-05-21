import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background-color: ${p => (p.primary ? 'red' : 'blue')};
  font-weight: bold;
  color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 10px;
  margin: 10px auto;
  width: 80%;
`
Button.defaultProps = {
  primary: false,
}

export { Button }
