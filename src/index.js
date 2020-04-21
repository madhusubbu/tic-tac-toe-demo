import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Board } from './components/board'
import { Scorecard } from './components/scorecard'
import 'bootstrap/dist/css/bootstrap.min.css'

import './styles/board.css'
import './styles/box.css'
import './styles/buttons.css'
import './styles/scorecard.css'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Scorecard}/>
          <Route path="/board" component={Board}/>
        </BrowserRouter>
      </div>
    )
  }
}

// Render the App component into DOM
ReactDOM.render(<App />, document.getElementById('root'))
