import React, { Component } from 'react';

class Status extends React.PureComponent {
    render() {
        return (
            <div id='score'>Score = 0 time = {this.props.time}</div>
        )
    }
}
export default Status;