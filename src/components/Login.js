import React from "react";
import Modal from "react-modal";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginFormOpen: false, email: "", password: "" , signUprequest: 'Sign Up', signInrequest: 'Sign In', type: 'Don\'t have an account ?'};
  }

  showLogin = () => {
    this.setState({ loginFormOpen: true });
  };

  hideLogin = () => {
    this.setState({ loginFormOpen: false , email : '', password : ''});
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeRequestHandle = () => {
    if(this.state.type === 'Already have an account ?'){
      this.setState({type : 'Don\'t have an account ?', signUprequest: 'Sign Up', signInrequest : 'Sign In'});
    }else{
      this.setState({type : 'Already have an account ?', signUprequest: 'Sign In', signInrequest: 'Sign Up'}); 
    }
    this.setState({email : '', password : ''});
  }

  // login = () => {
  //   const req = new Request("/api/users", {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //     }),
  //     body: JSON.stringify({
  //       email: this.state.email,
  //       password: this.state.password,
  //     }),
  //   });

  //   fetch(req)
  //   .then(resp => resp.json())
  //     .then((resp) =>{ 
  //       if(resp.status === 201 || resp.status === 200){
  //         this.setState({ loginFormOpen: false });
  //         this.setState({email : '', password : ''})
  //       }else{
  //         // alert(resp.error);
  //       }
  //     }).catch((err) => console.log(err));
  // };


  userLogIn = () => {
    if(this.state.signUprequest === 'Sign Up'){
      const request = new Request("/api/sessions", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: this.state.email,password: this.state.password})
      });
  
      fetch(request)
      .then((resp) => {
        if(resp.status === 400){
          alert("Invalid Crendentials");
        }else if(resp.status === 204){
          alert("Sign In Successful");
          this.setState({ loginFormOpen: false , email : '', password : ''});
        }
      })

    }else{
      const request = new Request("/api/users", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: this.state.email,password: this.state.password})
      });
  
      fetch(request)
      .then(resp => resp.json())
      .then((resp) => {
        if(resp.status === 400){
          alert(resp.error);
        }else if(resp.status === 201){
          alert("Sign Up Successful");
          this.setState({ loginFormOpen: false , email : '', password : ''});
        }
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
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
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
