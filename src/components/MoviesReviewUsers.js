import React from 'react';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';

class MoviesReviewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reviewFormOpen: false , reviewCount : 0, ratingCount : 0, averageRatingCount : 0, loginFormOpen: false, review: '', rating : 0, hover : 0, id : '', submitFlag : false, reviewDone : false, email : [], review : [], rate : [], reviewData : []};
    }

    openReviews = () => {
        this.setState({ reviewFormOpen: true });

        const request = new Request(`/api/movies/${this.props.id}`, {
            method: "GET",
        });

        fetch(request)
            .then((resp) => resp.json())
            .then(resp => {
                console.log(resp);
                if(resp.error === 'movie not found'){
                    return;
                }

                const data = resp.data;
                let idx = 0;
                let localReview = [];
                let localEmail = [];
                let localRating = [];
                data.forEach(data => {
                    localReview[idx] = data.review;
                    localEmail[idx] = data.email;
                    localRating[idx] = data.rate;
                    ++ idx;
                });

                this.setState({email : localEmail, rate : localRating, review:localReview})
            });
    }

    closeReviews = () => {
        this.setState({ reviewFormOpen: false });
    }

    componentDidMount = (props) => {
        const request = new Request(`/api/movies/${this.props.id}`, {
            method: "GET",
        });

        fetch(request)
            .then((resp) => resp.json())
            .then(resp => {
                console.log(resp);
                if(resp.error === 'movie not found'){
                    return;
                }

                const data = resp.data;
                let aValue = 0;
                data.forEach(data => {
                    aValue += data.rate;
                });

                this.setState({ratingCount : `${resp.data.length}`, reviewCount : `${resp.data.length}`, averageRatingCount : `${aValue / resp.data.length}`, email : `${resp.data.email}`})
            });
    }

    handleSetRating = (event) => {
        if(this.state.submitFlag === true){
            alert('Please remove previous response first');
            return;
        }

        this.setState({[event.target.name] : event.target.value});
    }

    handleReviewChange = (event) => {
        if(this.state.submitFlag === true){
            alert('Please remove previous response first');
            return;
        }
        this.setState({ [event.target.name]: event.target.value });
    }


    showLogin = () => {
        this.setState({ loginFormOpen: true });
    }

    hideLogin = () => {
        this.setState({ loginFormOpen: false });
    }

    submitReviews = (props) => {
        let request;
        if(this.state.reviewDone && !this.state.submitFlag){
                request = new Request("/api/reviews", {
                method: "PATCH",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({movieid: this.props.id, review: this.state.review, rate: this.state.rating})
              });
        }else{
                request = new Request("/api/reviews", {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({movieid: this.props.id, review: this.state.review, rate: this.state.rating})
              });
        }      
          fetch(request)
          .then(() => {
              alert('Thanks for the response')
              this.setState({ loginFormOpen: false , submitFlag : true, reviewDone : true});
              this.componentDidMount();
          });
    }

    removeRating = () => {
        this.setState({rating : 0, review : '', submitFlag : false});
    }


    render() {
        return (
            <>
            <button className={this.props.value} onClick={this.showLogin}>{this.props.action}</button>
                <Modal className="rating" isOpen={this.state.loginFormOpen}>
                    <div className="ratingContainer">
                        <div className="ratingClosebuttonContainer">
                            <button className="ratingClosebutton" onClick={this.hideLogin}>X</button>
                        </div>
                        <FaStar className="bigStar" size={70} />
                        <label className="rateThis">RATE THIS</label>
                        <ul className="rateBtnContainer">
                            <li>
                                <div>{[...Array(10)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (<label><input type="radio" name="rating"
                                        value={ratingValue} onClick={this.handleSetRating} />
                                        <FaStar name="hover" value={ratingValue} className="starRating" color={ratingValue <= (this.state.hover || this.state.rating) ? "yellow" : "grey"} size={25} onMouseEnter={() => this.setState({ hover: ratingValue })} onMouseLeave={() => this.setState({ hover: 0 })} />
                                    </label>
                                    );
                                })}
                                </div>
                            </li>
                            <li><textarea placeholder="Review..." className="review" type="text" name="review" value={this.state.review} onChange={this.handleReviewChange}></textarea></li>
                            <li><button onClick={this.submitReviews}>Submit</button></li>
                        </ul>
                        <button onClick={this.removeRating} className="remoteRating">Remove Response</button>
                    </div>
                </Modal>
            <div className="date"><label >Rating Count -  </label><label className="spaceBetweenText">{this.state.ratingCount}  </label>Review Count - {this.state.reviewCount}<label className="spaceBetweenText"> Average</label> Rating Count - {this.state.averageRatingCount}</div>
                <span onClick={this.openReviews} className="reviewOverviewText">Reviews  {[...Array(10)].map(() => { return <FaStar color="yellow" size={13} /> })}</span>
                <>
                <Modal className="rating2" isOpen={this.state.reviewFormOpen}>
                    <div className="ratingContainer">
                        <div className="ratingClosebuttonContainer">
                            <button className="ratingClosebutton" onClick={this.closeReviews}>X</button>
                        </div>
                        <div color="white">{[...Array(`${this.state.ratingCount}`)].reverse().map((index) => {
                            let value = index - 1;
                                    return (
                                        <>
                                        <ul className="ul">Email - {this.state.email[value]}</ul>
                                        <ul className="ol">Review - {this.state.review[value]}</ul> 
                                        <ul className="ol">Rating - {this.state.rate[value]}</ul>
                                        </>
                                    );
                                })}
                                </div>
                    </div>
                    
                </Modal>
                </>
            </>
        )
    }
}

export default MoviesReviewUsers;