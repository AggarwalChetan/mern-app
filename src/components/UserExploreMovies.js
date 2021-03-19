import React from 'react';
import { useHistory, useParams } from 'react-router';
import UsersMoviesByIdInfo from './UsersMoviesByIdInfo'

function UserExploreMovies (){
    let history = useHistory();

    function handleExplore (){    
        history.push('/user-profile');
    }

    // Movie Id
    const dataId = useParams();
    
    return (<>
            <header>
              <button className="homeMovies" onClick={handleExplore}>Home</button>
            </header>
            <UsersMoviesByIdInfo id={dataId.id}/>
          </>);
}

export default UserExploreMovies;