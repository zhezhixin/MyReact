import logo from './logo.svg';
import './App.css';
import React, { Component, lazy, Suspense }from "react"
import HelloWorld from './components/HelloWorld'
import Game from './components/Game'
import Todo from './components/Todo'
import Clock from './components/Clock'

import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

const Advance = lazy(() =>import('./components/Advance'))
const Advance2 = lazy(() =>import('./components/Advance2'))

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <HelloWorld />
          <Router>
            <div>
              <ul>
             
                <li><Link to='/game'>Game</Link></li>
                <li><Link to='/clock'>Clock</Link></li>
                <li><Link to='/todo'>Todo</Link></li>
                <li><Link to='/advance'>Advance</Link></li>
                <li><Link to='/advance2'>Advance2</Link></li>
               
              </ul>
            </div>
            <Suspense fallback={<div>loading......</div>}>
              <Switch>
                <Route exact path="/advance" component={Advance} />
                <Route path="/advance2" component={Advance2} />
              </Switch>
            </Suspense>
            <Route path="/todo" component={Todo} />
            <Route path="/game" component={Game} />
            <Route path="/clock" component={Clock} />
          </Router>
          <br></br>
          <br></br>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

//初始版本
// function App() {
//  return (
//    <div >
//       hello ,world 
//    </div>
//  );
//}

export default App;
