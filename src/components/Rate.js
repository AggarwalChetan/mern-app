import React from 'react';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';

class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginFormOpen: false, review: '', rating : 0, hover : 0};
    };

    handleSetRating = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    showLogin = () => {
        this.setState({ loginFormOpen: true });
    }

    hideLogin = () => {
        this.setState({ loginFormOpen: false })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    removeRating = () => {
        this.setState({rating : 0, review : ''});
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
                            <li><textarea placeholder="Review..." className="review" type="text" name="review" value={this.state.review} onChange={this.handleChange}></textarea></li>
                            <li><button onClick={this.hideLogin}>Submit</button></li>
                        </ul>
                        <button onClick={this.removeRating} className="remoteRating">Remove Rating</button>
                    </div>

                </Modal>
            </>
        );
    }
}

export default Rate;




