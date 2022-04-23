import React, { Component } from "react";
import FormError from "./FormError";
import firebase from "./Firebase";

class Register extends Component {
  constructor(props) {
    // puttins props here makes it to be available anywhere in my application

    super(props);
    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: "Passwords no not match" });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    var registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne,
    };
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
      })
      // we call a .then promise to put the user info gotten from firebase on my web page
      //this.props here is coming from the constructor.props

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
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                    {this.state.errorMessage !== null ? (
                      <FormError theMessage={this.state.errorMessage} />
                    ) : null}
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                        value={this.state.displayName}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value={this.state.passOne}
                        onChange={this.handleChange}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value={this.state.passTwo}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
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

export default Register;

// import firebase from "firebase";
// import React, { Component } from "react";
// import FormError from "./FormError";

// //you use htmlFor for the For Keyword in JSX
// // we want to capture the data in each field of our forms and store in our state in the component we are working with which is the register

// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       displayName: "",
//       email: "",
//       passOne: "",
//       passTwo: "",
//       errorMessage: null,
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleChange.bind(this);
//   }
//   // e is an event listener
//   // because we are modifying state with a method called handlechange(e) that is outside the original Register object
//   //  we then  this.handleChange = this.handleChange.bind(this); to ensure that this handlechange function refers to the this.state in the Register constructor and not something else

//   handleChange(e) {
//     const itemName = e.target.name;
//     const itemValue = e.target.value;
//     // we creating a function after this.state gets done
//     this.setState({ [itemName]: itemValue }, () => {
//       // this means if the passwords do not match give an error message
//       //note preferably use == to check if things are equal
//       if (this.state.passOne !== this.state.passTwo) {
//         this.setState({ errorMessage: "Passwords do not match" });
//       } else {
//         //dont show error message
//         this.setState({ errorMessage: null });
//       }
//     });
//   }
//   // after creating the event function we then call its action on the various input fields

//   // we create an event that gathers all the values from the form
//   handleSubmit(e) {
//     var registrationInfo = {
//       displayName: this.state.displayName,
//       email: this.state.email,
//       password: this.state.passOne,
//     };

//     // this is to prevent default reload of the page so we can maintain the data in the state without losing it
//     e.preventDefault();
//     // we call the firebase to create email and password for us
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(
//         registrationInfo.email,
//         registrationInfo.password
//         // next we pass along an error detection method
//       )
//       .catch((error) => {
//         // this means if error.message is not equal to null do this, !== is a not equal to operator
//         if (error.message !== null) {
//           this.setState({ errorMessage: error.message });
//         } else {
//           this.setState({ errorMessage: null });
//         }
//       });
//   }
//   render() {
//     return (
//       <form className="mt-3" onSubmit={this.handleSubmit}>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-8">
//               <div className="card bg-light">
//                 <div className="card-body">
//                   <h3 className="font-weight-light mb-3">Register</h3>
//                   <div className="form-row">
//                     {this.state.errorMessage !== null ? (
//                       //we pass the error message prop to form error component
//                       //note for a tenary statement, you must have the true ? and false : notation
//                       <FormError theMessage={this.state.errorMessage} />
//                     ) : null}
//                     <section className="col-sm-12 form-group">
//                       <label
//                         className="form-control-label sr-only"
//                         htmlFor="displayName"
//                       >
//                         Display Name
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         id="displayName"
//                         placeholder="Display Name"
//                         name="displayName"
//                         required
//                         // This is where we call the event
//                         value={this.state.displayName}
//                         onChange={this.handleChange}
//                       />
//                     </section>
//                   </div>
//                   <section className="form-group">
//                     <label
//                       className="form-control-label sr-only"
//                       htmlFor="email"
//                     >
//                       Email
//                     </label>
//                     <input
//                       className="form-control"
//                       type="email"
//                       id="email"
//                       placeholder="Email Address"
//                       required
//                       name="email"
//                       value={this.state.email}
//                       onChange={this.handleChange}
//                     />
//                   </section>
//                   <div className="form-row">
//                     <section className="col-sm-6 form-group">
//                       <input
//                         className="form-control"
//                         type="password"
//                         name="passOne"
//                         placeholder="Password"
//                         value={this.state.passOne}
//                         onChange={this.handleChange}
//                       />
//                     </section>
//                     <section className="col-sm-6 form-group">
//                       <input
//                         className="form-control"
//                         type="password"
//                         required
//                         name="passTwo"
//                         placeholder="Repeat Password"
//                         value={this.state.passTwo}
//                         onChange={this.handleChange}
//                       />
//                     </section>
//                   </div>
//                   <div className="form-group text-right mb-0">
//                     <button className="btn btn-primary" type="submit">
//                       Register
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     );
//   }
// }

// export default Register;
