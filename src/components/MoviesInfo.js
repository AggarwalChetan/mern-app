import MoviesTitle from './MoviesTitle';
import MoviesAverageVoteCount from './MoviesAverageVoteCount';

function MoviesInfo(props) {
    return (
        <div className="movie-info">
            <MoviesTitle title={props.title} />
            <MoviesAverageVoteCount vote_average={props.vote_average} />
        </div>
    );
}

export default MoviesInfo;