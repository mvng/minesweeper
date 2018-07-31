import React, { Component } from 'react';
import './App.css';
import Board from './container/Board';
import Status from './container/Status';

class App extends Component {
  constructor() {
    super();
    sessionStorage.setItem('time', Date.now());

    this.state = {
      score: 0,
      time: 0
    }
  }
  componentDidMount() {
    setInterval(() => {
      let time = Math.floor((Date.now() - sessionStorage.getItem("time")) / 1000);
      this.setState({
        time: time
      })
    }, 1000);  
  }
  render() {
    return (
      <div className="App">
        <Board size={15} mines={100} />
        <Status time={this.state.time}/>
      </div>
    );
  }
}

export default App