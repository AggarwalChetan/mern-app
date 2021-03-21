
import React from 'react';
import MoviesPoster from './MoviesPoster';
import MoviesInfo from './MoviesInfo';
import Rate from './Rate';
import MoviesReviewUsers from './MoviesReviewUsers';


class UsersMoviesByIdInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies : []};
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

  handleTemp = () => {
        const request = new Request("/api/users/me", {
            method: "GET"
          });
      
          fetch(request)
          .then((request) => {
              console.log(request.json());
          });
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
            {/* <li><div>{<Rate value="moviesByIdRate" action="Rate" id={this.props.id}/>}</div></li> */}
            <li><MoviesReviewUsers id={this.props.id} value="moviesByIdRate" action="Rate" id={this.props.id}/></li>
            </ul>
        </div>
      </div>
      </>
    );
  };

}


export default UsersMoviesByIdInfo;