import React from 'react';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';

class MoviesReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reviewFormOpen: false , reviewCount : 0, ratingCount : 0, averageRatingCount : 0};
    }

    openReviews = () => {
        this.setState({ reviewFormOpen: true });
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
                if(resp.error === 'movie not found'){
                    return;
                }
                const data = resp.data;
                let aValue = 0;
                data.forEach(data => {
                    aValue += data.rate;
                });

                this.setState({ratingCount : `${resp.data.length}`, reviewCount : `${resp.data.length}`, averageRatingCount : `${aValue / resp.data.length}`})
            });
    }

    render() {
        return (
            <>
            <div className="date"><label >Rating Count -  </label><label className="spaceBetweenText">{this.state.ratingCount}  </label>Review Count - {this.state.reviewCount}<label className="spaceBetweenText"> Average</label> Rating Count - {this.state.averageRatingCount}</div>
                <span className="reviewOverviewText">Reviews  {[...Array(10)].map(() => { return <FaStar color="yellow" size={13} /> })}</span>
                <Modal className="rating2" isOpen={this.state.reviewFormOpen}>
                    <div className="ratingContainer">
                        <div className="ratingClosebuttonContainer">
                            <button className="ratingClosebutton" onClick={this.closeReviews}>X</button>
                        </div>
                        {/* <ul className="reviewsTable">Hi</ul>
                        <ol></ol> */}
                        {/* <button onClick={this.componentDidMount}>Button</button> */}
                    </div>

                </Modal>
            </>
        )
    }
}

export default MoviesReview;