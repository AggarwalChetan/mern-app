const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'yellow';
    } else {
        return 'red';
    }
};

function MoviesAverageVoteCount(props) {
    return (
        <span className={`tag ${setVoteClass(props.vote_average)}`}>{props.vote_average}</span>
    );
}

export default MoviesAverageVoteCount;

