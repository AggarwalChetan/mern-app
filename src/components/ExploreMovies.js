import React from 'react';
import { useHistory, useParams } from 'react-router';
import Login from './Login';
import MoviesByIdInfo from './MoviesByIdInfo'

function ExploreMovies (){
    let history = useHistory();

    function handleExplore (){    
        history.push('/');
    }

    // Movie Id
    const dataId = useParams();
    
    return (<>
            <header>
              <button className="homeMovies" onClick={handleExplore}>Home</button>
              <Login value="signIn" action="Sign In" />
            </header>
            <MoviesByIdInfo id={dataId.id}/>
          </>);
}

export default ExploreMovies;