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
                //TODO: Randomize Bombs - (Math.random() >= .5)
                if (mines > bombs && Math.random() >= .9) {
                    bombs++;
                    return '*';
                }
                return 0;
            })
        });
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

        let board = this.state.board;
        let mask = this.state.mask;
        let size = this.props.size;
        let _this = this;
        let foundNumber = false;

        if(board[x][y] === '*') {
            alert('Game Over');
        } else {
            mask[x][y] = board[x][y];
            if(mask[x][y] === 0) {

                function checkZero(x,y) {
                    
                    if ( x < 0 || y < 0 || x >= size || y >= size) {
                        return false;
                    }

                    if (!foundNumber && mask[x][y] === '-' && board[x][y] !== '*') {
                        mask[x][y] = board[x][y];
                        if(board[x][y] !== 0) {
                            foundNumber = true;
                            return;
                        }
                        _this.openTile(x, y);

                    }  
                    return;        
                 }
                //Check adjacent
                checkZero(x + -1, y + 0);
                checkZero(x + 0, y + -1);
                checkZero(x + 0, y + 1);
                checkZero(x + 1, y + 0);

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