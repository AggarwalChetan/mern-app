
import React from 'react';
import MoviesPoster from './MoviesPoster';
import MoviesInfo from './MoviesInfo';
import MoviesRate from './MoviesRate';

class MoviesByIdInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies : [], id : 522938};
  };

  // for home page
  componentDidMount = (props) => {
    fetch('/api/searchById', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({id : this.props.id})
      }).then(res => res.json())
      .then((data) => {this.setState({movies : data});});
  }

  render() {
    return (
      <>
      <div className="movieByIdContainer">
        <div className="movieById">
          <MoviesPoster poster_path={this.state.movies.poster_path} title={this.state.movies.title} />
          <MoviesInfo title={this.state.movies.title} vote_average={this.state.movies.vote_average} />
        </div>
        <div className="movieByIdInfo">
            <ul>
            <li className="overview"><div>Overview</div></li>
            <li><label className="date">IMDb </label><label className="spaceBetweenText">{this.state.movies.vote_average} {this.state.movies.release_date}</label></li>
            <li><div className="overviewText">{this.state.movies.overview}</div></li>
            </ul>
            
        </div>
      </div>
      
{/*       
      </div> */}
      </>
    );
  };

}


export default MoviesByIdInfo;