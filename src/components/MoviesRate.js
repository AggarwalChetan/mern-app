import React from 'react';
import Login from './Login';
import Rate from './Rate';


class MoviesRate extends React.Component{
    constructor(props){
        super(props);
        this.state = {isSignIn : false};
    }

    handleSignIn = () => {

    }

    render() {
        return (<Rate value="voteButton" action="Rate"/>);
    }
    
}


export default MoviesRate;