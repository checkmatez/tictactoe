import React, { Component } from 'react'
import { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthForm from '../AuthForm'
import Main from '../Main'

injectGlobal`
	body {
		margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
	}
  *, *:before, *:after {
    box-sizing: border-box;
  }
`

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={AuthForm} />
          <Route path="/game" exact component={Main} />
        </div>
      </Router>
    )
  }
}

export default App
