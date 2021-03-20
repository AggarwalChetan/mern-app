import React from "react";
import Modal from "react-modal";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginFormOpen: false, email: "", password: "" , signUprequest: 'Sign Up', signInrequest: 'Sign In', type: 'Don\'t have an account ?', emailError : '', passError : ''};
  }

  showLogin = () => {
    this.setState({ loginFormOpen: true });
  };

  hideLogin = () => {
    this.setState({ loginFormOpen: false , email : '', password : ''});
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, emailError : '', passError : ''});
  };

  changeRequestHandle = () => {
    this.setState({emailError : '', passError : ''});

    if(this.state.type === 'Already have an account ?'){
      this.setState({type : 'Don\'t have an account ?', signUprequest: 'Sign Up', signInrequest : 'Sign In'});
    }else{
      this.setState({type : 'Already have an account ?', signUprequest: 'Sign In', signInrequest: 'Sign Up'}); 
    }
    this.setState({email : '', password : ''});
  }

  userLogIn = () => {

    if(this.state.email === ""){
      this.setState({emailError : 'Email Id not present'});
    }else if(this.state.password === ''){
      this.setState({passError : 'Password not present'});
    }


    if(this.state.signInrequest === 'Sign In'){
      const request = new Request("/api/sessions", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: this.state.email,password: this.state.password})
      });
  
      fetch(request)
      .then(resp => {
        if(resp.status === 400){
          if(this.state.email === '' && this.state.password === ''){
            this.setState({emailError : 'Email not present', passError : 'Password not present'});
          }else if(this.state.password === ''){
            this.setState({passError : 'Password not present'});
          }else if(this.state.email === ''){
            this.setState({emailError : 'Email Id not present'});
          }else if(this.state.email !== '' && this.state.password !== ''){
            alert('Incorrect Email or Password');
          }
          return;
        }
        this.setState({ loginFormOpen: false , email : '', password : '', emailError : '', passError : ''});
        window.location = '/user-profile';
      })

    }else{
      const request = new Request("/api/users", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: this.state.email,password: this.state.password})
      });
  
      fetch(request)
      .then(resp => {
        if(resp.status === 400){
          if(this.state.email === '' && this.state.password === ''){
            this.setState({emailError : 'Email not present', passError : 'Password not present'});
          }else if(this.state.password === ''){
            this.setState({passError : 'Password not present'});
          }else if(this.state.email === ''){
            this.setState({emailError : 'Email Id not present'});
          }else if(this.state.email !== '' && this.state.password !== ''){
            alert('Email Already Present');
          }
          return;
        }
        this.setState({ loginFormOpen: false , email : '', password : '',  emailError : '', passError : ''});
        window.location = '/user-profile';
      })
    }
  }

  render() {
    return (
      <>
        <button className={this.props.value} onClick={this.showLogin}>
          {this.props.action}
        </button>
        <Modal className="login" isOpen={this.state.loginFormOpen}>
          <div className="loginContainer">
            <div className="closebuttonContainer">
              <button className="closebutton" onClick={this.hideLogin}>X</button>
            </div>
            <label>Email</label>
            <input type="text" name="email" value={this.state.email}onChange={this.handleChange}></input>
            <p className="errorMsg">{this.state.emailError}</p>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
            <p className="errorMsg">{this.state.passError}</p>
            <div className="btnContainer">
              <>
                <button onClick={this.userLogIn}>{this.state.signInrequest}</button>
                <p>{this.state.type}<span onClick={this.changeRequestHandle}>{this.state.signUprequest}</span></p>
              </>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Login;
