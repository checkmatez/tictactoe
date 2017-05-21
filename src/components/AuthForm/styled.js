import styled from 'styled-components'

import { media } from '../../utils/media'

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  min-width: 100vh;
  min-height: 100vh;
  background: url(/images/Roadways.jpg) center center no-repeat fixed; 
  background-size: cover;
`
export const LoginForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.7);
  width: 400px;
  height: 300px;
  border-radius: 10px;
`
export const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-self: stretch;
`
export const Input = styled.input`
  outline: none;
  background-color: white;
  border: none;
  border-radius: 3px;
  margin: 10px 0;
  font-size: 1rem;
  min-width: 80%;
  padding: 10px;
`
