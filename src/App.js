import logo from './logo.svg';
import './App.css';
import React, { Component }from "react"
import HelloWorld from './components/HelloWorld'
import Game from './components/Game'
import Todo from './components/Todo'
import Clock from './components/Clock'


class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <HelloWorld />
          <Clock />
          <Game />
          <Todo />
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
