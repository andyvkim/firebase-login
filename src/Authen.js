import React, {Component} from 'react'
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyDdTv4GHFw3G-UG8TbXmW7QlZzY-rrUaNE",
  authDomain: "fir-login-3d5d5.firebaseapp.com",
  databaseURL: "https://fir-login-3d5d5.firebaseio.com",
  projectId: "fir-login-3d5d5",
  storageBucket: "fir-login-3d5d5.appspot.com",
  messagingSenderId: "1048459167401"
};
firebase.initializeApp(config);



class Authen extends Component {

  login(event){
    const email = this.refs.email.value
    const password = this.refs.password.value
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');
    })
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(event){
    const email = this.refs.email.value
    const password = this.refs.password.value
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = 'welcome ' + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err:err});
    });
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err:err}));
    });
  }
  logout(){
    firebase.auth().signOut();
    var err = "Thanks!"
    this.setState({err:err});
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
  }


  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }
  render(){
    return(
      <div>
        <input id ='email' ref = 'email' type = 'email' placeholder = 'enter your email' /><br/>
        <input id ='pass' ref = 'password' type = 'password' placeholder = 'enter your password' /><br/>
        <p>{this.state.err}</p>
      <button onClick = {this.login}>Log in</button>
      <button onClick = {this.signup}>Sign up</button>
      <button onClick = {this.logout} id ='logout' className = 'hide'> Log out</button>
      </div>
    );
  }
}

export default Authen;
