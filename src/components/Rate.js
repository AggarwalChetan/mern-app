import React from 'react';
import Modal from 'react-modal';
import Star from './Star';

class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginFormOpen: false, review : ''};
    };

    showLogin = () => {
        this.setState({ loginFormOpen: true });
    }
    
    hideLogin = () => {
        this.setState({ loginFormOpen: false })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
                        <label className="rateThis">RATE THIS</label>
                        <ul className="rateBtnContainer">
                            <li><Star/></li>
                            <li><textarea placeholder="Review..." className="review"type="text" name="review" value={this.state.review} onChange={this.handleChange}></textarea></li>              
                            <li><button>Submit</button></li>              
                        </ul>
                    </div>
                     
                </Modal>
            </>
        );
    }
}

export default Rate;




