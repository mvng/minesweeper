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
      // status: '-'
      status: this.props.bomb

    }
  }
  handleClick() {

    this.setState({
      status: this.props.bomb
    });

    if(this.props.bomb === '*') {
      alert('Game Over');
    }

    if(this.props.bomb === 0) {
      console.log("Check Adjacent Squares if they are 0 - dispatch position'" );
    }
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
    let bombs = 0;
    let {mines, size} = this.props;
    let iter = 0;
    let board = _.range(size).map( () => {
      return _.range(size).map(() => {
        //TODO: Randomize Bombs - (Math.random() >= .5)
        iter++;
        if (mines > bombs) {
          bombs++;
          return '*';
        }
        return 0;
      })
    });
    console.log(iter);
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {

        if(board[row][col] === '*') {
          incriment(row, col);
        }
      }
    }

    function incriment(row, col) {
      function checkCoordinates(x, y) {

        if (x < 0 || y < 0 || x >= size || y >= size) {
          return false;
        }

        if (board[x][y] === '*') {
          return false
        }
        board[x][y]++;
        return true;
      }

      for (let gridX = -1; gridX < 2; gridX++) {
        for (let gridY = -1; gridY < 2; gridY++) {
          checkCoordinates(row + gridX, col + gridY);
        }
      }
    }

    this.state = {
      board: board
    }
  }


render() {

  return(
    <div>{this.state.board.map((x, row) => {
      let boardRow = x.map((status, col) => {
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
        <Board size={10} mines={10}/>
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
