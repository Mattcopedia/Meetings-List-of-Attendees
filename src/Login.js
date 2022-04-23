import React, { Component } from "react";
import firebase from "firebase";
import FormError from "./FormError";
import { navigate } from "@reach/router";

class Login extends Component {
  constructor(props) {
    // puttins props here makes it to be available anywhere in my application

    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    e.preventDefault();
    // we will use sign in the email and password auth function in firebase for this login page rather than create email and password
    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/meetings");
        // this.props.registerUser(registrationInfo.displayName);
      })
      // we call a .then promise to put the user info gotten from firebase on my web page
      //this.props here is coming from the constructor.props
      // error.message !== null means if error message is not equal to false i.e it is true display the error message
      .catch((error) => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }

  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Log in</h3>
                  <section className="form-group">
                    {this.state.errorMessage !== null ? (
                      <FormError theMessage={this.state.errorMessage} />
                    ) : null}

                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="form-group">
                    <input
                      required
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
