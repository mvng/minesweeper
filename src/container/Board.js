import React, { Component } from 'react';
import _ from 'lodash';
import Tile from './Tile';

class Board extends Component {
    constructor(props) {
        super(props);
        let bombs = 0;
        let { mines, size } = this.props;
        let board = _.range(size).map(() => {
            return _.range(size).map(() => {
                return 0;
            })
        });

        //Lay Bombs Randomly by RNG
        for (let b = 0; bombs < mines; b ++) {
            let x = Math.floor((Math.random() * Date.now() * size)) % size;
            let y = Math.floor((Math.random() * Date.now() * size)) % size;
            if(board[x][y] !== '*') {
                //Slot does not have a bomb
                board[x][y] = '*';
                bombs++;
            }
        }
        let mask = _.range(size).map(() => {
            return _.range(size).map(() => {
                return '-';
            })
        });

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {

                if (board[row][col] === '*') {
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
            board: board,
            mask: mask
        }
    }

    openTile(x,y) {
        const { size } = this.props;
        const _this = this;

        let { board, mask } = this.state;
        mask[x][y] = board[x][y];

        if(board[x][y] === '*') {
            alert('Game Over');
        } else {
            if(mask[x][y] === 0) {
                function checkZero(x,y) {
                    if ( x < 0 || y < 0 || x >= size || y >= size) {
                        return false;
                    }
                    if (mask[x][y] === '-' && board[x][y] !== '*') {
                        mask[x][y] = board[x][y];
                        if(board[x][y] !== 0) {
                            return;
                        }
                        _this.openTile(x, y);
                    }  
                    return;        
                 }
                for (let gridX = -1; gridX < 2; gridX++) {
                    for (let gridY = -1; gridY < 2; gridY++) {
                        checkZero(x + gridX, y + gridY);
                    }
                }
            }
        }
        this.setState({mask: mask});
    }
    render() {

        return (
            <div>{this.state.mask.map((x, row) => {
                let boardRow = x.map((status, col) => {
                    return <Tile key={col} openTile={() => { this.openTile(row,col)} } display={status} bomb={status} />;
                })
                return <div key={row} className="row">{boardRow}</div>
            })}</div>
        )
    }
}
export default Board;