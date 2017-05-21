import React, { Component } from 'react'

import { Container, LoginForm, Input } from './styled'
import { Button } from '../StyledCommon'

class PresentationalForm extends Component {
  state = {
    errors: [],
    email: '',
    password: '',
  }

  _onSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.onSubmit({ email, password })
  }

  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Container>
        <LoginForm onSubmit={this._onSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@test.com"
            required
            value={this.state.email}
            onChange={this._onChange}
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            value={this.state.password}
            onChange={this._onChange}
          />
          <Button type="Submit" primary>Войти / Зарегистрироваться</Button>
        </LoginForm>
      </Container>
    )
  }
}

export default PresentationalForm
