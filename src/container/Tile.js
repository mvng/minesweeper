import React, { Component } from 'react';

class Tile extends React.PureComponent {

    render() {
        return (
            <div className="tile" onClick={() => {this.props.openTile()}}>
                {this.props.display}
            </div>
        )
    }
}

export default Tile;