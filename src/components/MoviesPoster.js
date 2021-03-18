function MoviesPoster(props) {
    const IMG_API = "https://image.tmdb.org/t/p/w1280/";
    const RANDOM_IMG_API = "https://images.unsplash.com/photo-1611787640592-ebf78080d96e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";

    return (
        <img src={props.poster_path ? (IMG_API + props.poster_path) : (RANDOM_IMG_API)} alt={props.title} />
    );
}

export default MoviesPoster;