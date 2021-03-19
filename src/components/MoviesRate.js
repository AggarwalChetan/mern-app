import React from 'react';
import Rate from './Rate';

class MoviesRate extends React.Component{
    render() {
        return (<Rate value="voteButton" action="Rate" id={this.props.id}/>);
    }
    
}


export default MoviesRate;