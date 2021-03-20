import React from 'react';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';

class MoviesReview extends React.Component{
    constructor(props){
        super(props);
        this.state = { reviewFormOpen: false};
    }

    openReviews = () => {
        this.setState({ reviewFormOpen: true });
    }

    closeReviews = () => {
        this.setState({ reviewFormOpen: false });
    }

    render(){
        return (
            <>
                <span onClick={this.openReviews} className="reviewOverviewText">Reviews  {[...Array(10)].map(() => {return <FaStar color="yellow" size={13}/>})}</span>
                <Modal className="rating" isOpen={this.state.reviewFormOpen}>
                    <div className="ratingContainer">
                        <div className="ratingClosebuttonContainer">
                            <button className="ratingClosebutton" onClick={this.closeReviews}>X</button>
                        </div>
                    </div>
                
                </Modal>
            </>
        )
    }
}

export default MoviesReview;