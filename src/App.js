import React, { Component } from 'react';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';

// * === bomb
// F === flag
// - === unchecked

class Tile extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      status: '-'
    }
  }
  handleClick() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="tile" onClick={this.handleClick.bind(this)}>
        {this.state.status}
      </div>
    )
  }
}

class Board extends Component {
  constructor(props){
    super(props);
    let _this = this;
    let board = _.range(this.props.size).map( () => {
      return _.range(this.props.size).map(() => {
        return 'X'
      })
    });
    this.state = {
      board: board
    }
  }
render() {
  return(
    <div>{this.state.board.map((x, row, z) => {
      let boardRow = x.map((status, col, arr) => {
        let pos = { x: row, y: col }
        return <Tile key={col} position={pos} bomb={status} />;
      })
      return <div key={row} className="row">{boardRow}</div>
    })}</div>
  )
}
  }

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
        <Board size={6} mines={5}/>
        <Status time={this.state.time}/>
      </div>
    );
  }
}

class Status extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id='score'>Score = 0 time = {this.props.time}</div>
    )
  }
}

export default App;
