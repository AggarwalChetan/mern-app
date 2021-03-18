import MoviesRate from './MoviesRate';
import {useHistory} from 'react-router-dom';

function MoviesOverview(props) {

    let history = useHistory();

    function handleExplore (){    
        history.push(`/${props.id}`);
    }

    return (
        <div className="movie-over">
            <h2>Overview</h2>
            <h4>{props.release_date}</h4>
            <p>{props.overview}</p>            
            <h5>Total Vote Count - {props.vote_count}</h5>
            <div className="buttonContainer">
                <MoviesRate/>
                <button className="exploreMovie" onClick={handleExplore}>Explore</button>
            </div>
            
        </div>
    );
}

export default MoviesOverview;