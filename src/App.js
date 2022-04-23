import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
import Meetings from "./Meetings";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });

        const meetingsRef = firebase.database().ref("meetings/" + FBUser.uid);

        meetingsRef.on("value", (snapshot) => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName,
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length,
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser = (userName) => {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: userName,
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        navigate("/meetings");
      });
    });
  };

  logOutUser = (e) => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null,
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = (meetingName) => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings
            path="/meetings"
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
            userID={this.state.userID}
          />
          <Attendees
            path="/attendees/:userID/:meetingID"
            adminUser={this.state.userID}
          />
          <CheckIn path="/checkin/:userID/:meetingID" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;

// // Import React
// import React, { Component } from "react";
// import { Router, navigate } from "@reach/router";
// import firebase from "./Firebase";

// import Home from "./Home";
// import Welcome from "./Welcome";
// import Navigation from "./Navigation";
// import Login from "./Login";
// import Register from "./Register";
// import Meetings from "./Meetings";
// import CheckIn from "./CheckIn";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: null,
//       displayName: null,
//       userID: null,
//     };
//   }

//   componentDidMount() {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       if (FBUser) {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//         // all this is to get the meetings info in firestore database to display it when needed
//         const meetingsRef = firebase.database().ref("meetings/" + FBUser.uid);

//         meetingsRef.on("value", (snapshot) => {
//           let meetings = snapshot.val();
//           let meetingsList = [];

//           // when you push the ,eeting Id all you need is reference to the item
//           // wgen you push the meeting name you need reference to the item in meetings snd meetingName
//           for (let item in meetings) {
//             meetingsList.push({
//               meetingID: item,
//               meetingName: meetings[item].meetingName,
//             });
//           }
//           this.setState({
//             meetings: meetingsList,
//             howManyMeetings: meetingsList.length,
//           });
//         });
//       } else {
//         this.setState({ user: null });
//       }
//     });
//   }

//   registerUser = (userName) => {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       FBUser.updateProfile({
//         displayName: userName,
//       }).then(() => {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//         navigate("/meetings");
//       });
//     });
//   };

//   logOutUser = (e) => {
//     e.preventDefault();
//     this.setState({
//       displayName: null,
//       userID: null,
//       user: null,
//     });

//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         navigate("/login");
//       });
//   };

//   addMeeting = (meetingName) => {
//     const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
//     ref.push({ meetingName: meetingName });
//   };

//   render() {
//     return (
//       <div>
//         <Navigation user={this.state.user} logOutUser={this.logOutUser} />
//         {this.state.user && (
//           <Welcome
//             userName={this.state.displayName}
//             logOutUser={this.logOutUser}
//           />
//         )}

//         <Router>
//           <Home path="/" user={this.state.user} />
//           <Login path="/login" />
//           <Meetings
//             path="/meetings"
//             meetings={this.state.meetings}
//             addMeeting={this.addMeeting}
//             userID={this.state.userID}
//           />
//           <CheckIn path="/checkin/:userID/:meetingID" />
//           <Register path="/register" registerUser={this.registerUser} />
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;

// // Import React
// import React, { Component } from "react";
// import { Router, navigate } from "@reach/router";
// import firebase from "./Firebase";

// import Home from "./Home";
// import Welcome from "./Welcome";
// import Navigation from "./Navigation";
// import Login from "./Login";
// import Register from "./Register";
// import Meetings from "./Meetings";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: null,
//       displayName: null,
//       userID: null,
//     };
//   }

//   componentDidMount() {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       if (FBUser) {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//       }
//     });
//   }

//   registerUser = (userName) => {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       FBUser.updateProfile({
//         displayName: userName,
//       }).then(() => {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//         navigate("/meetings");
//       });
//     });
//   };

//   logOutUser = (e) => {
//     e.preventDefault();
//     this.setState({
//       displayName: null,
//       userID: null,
//       user: null,
//     });

//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         navigate("/login");
//       });
//   };

//   // we use ref method to refer to firebase database, ref tells the database where you want to write things too
//   // we use ref.push to push some data into the database
//   addMeeting = (meetingName) => {
//     const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
//     ref.push({ meetingName: meetingName });
//   };

//   render() {
//     return (
//       <div>
//         <Navigation user={this.state.user} logOutUser={this.logOutUser} />
//         {this.state.user && (
//           <Welcome
//             userName={this.state.displayName}
//             logOutUser={this.logOutUser}
//           />
//         )}

//         <Router>
//           <Home path="/" user={this.state.user} />
//           <Login path="/login" />
//           {/* On the left is the props you are passing to the component and on the right is what your what to do in this component */}
//           <Meetings path="/meetings" addMeeting={this.addMeeting} />
//           <Register path="/register" registerUser={this.registerUser} />
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;

// import React, { Component } from "react";
// import { Router, navigate } from "@reach/router";
// import firebase from "./Firebase";

// import Home from "./Home";
// import Welcome from "./Welcome";
// import Navigation from "./Navigation";
// import Login from "./Login";
// import Register from "./Register";
// import Meetings from "./Meetings";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: null,
//       displayName: null,
//       userID: null,
//     };
//   }

//   // this is a lifecycle component that lets you perform certain events at a specific application lifecycle.
//   //in this case it is anytime the application loads this componentwillmount method runs which will catch an event letting the browser know that the component is loading
//   // ref method is used to refer to the user stored in firebase

//   componentWillUnmount() {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       if (FBUser) {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//       }

//       // const ref = firebase.database().ref("user");
//       // //this is saying whenever we get a new value for a reference we grab a snapshot of how the data currently is
//       // // we then perform a function on that data.
//       // ref.on("value", (snapshot) => {
//       //   //this will get us the value of our database on snapshot and we assign this function to FBUSER variable
//       //   let FBUser = snapshot.val();
//       //   // we then change the state of our component to show whats on the database
//       //   // we can only use this.setState to peform functions to change data and not this.state
//       //   this.setState({ user: FBUser });
//     });
//   }
//   // firebase realtime database updates the data in real time database meaning if you update it in firebase backend it updates live on our website for all users

//   //onAUthstatechnaged is an event listener that listens when something changes about the authentification, we track that and do something about it
//   //onauthstatechnaged is called when we register the users email and password
//   // we then call a function on firebase called update profile to update the form fields populating it with data from firbase user info
//   registerUser = (userName) => {
//     firebase.auth().onAuthStateChanged((FBUser) => {
//       FBUser.updateProfile({
//         displayName: userName,
//       }).then(() => {
//         this.setState({
//           user: FBUser,
//           displayName: FBUser.displayName,
//           userID: FBUser.uid,
//         });
//         navigate("./meetings");
//       });
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Navigation user={this.state.user} />
//         {this.state.user && <Welcome userName={this.state.displayName} />}
//         {/* using this.state.displayName when the user registers it shows welcome and the name of the user that logged in */}
//         <Router>
//           <Home path="/" user={this.state.user} />
//           <Login path="/login" />
//           <Meetings path="/meetings" />
//           <Register path="/register" registerUser={this.registerUser} />
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;

// // // Import React
// // import React, { Component } from "react";
// // import Welcome from "./Welcome";
// // import Home from "./Home";
// // import Navigation from "./Navigation";
// // import { Router } from "@reach/router";
// // import Login from "./Login";
// // import Register from "./Register";
// // import Meetings from "./Meetings";

// // //store the main information in the App.js Component and create other sub components for for other information which you can then render on App.js

// // // constructor is the method that defines what the component looks like when it is created
// // // super method is how you initialize a constructor i. what makes the contructor work
// // //this.state is the special object carrying the data like the users
// // class App extends Component {
// //   constructor() {
// //     super();
// //     this.state = {
// //       user: "Ray",
// //     };
// //   }

// //   render() {
// //     // we are capturing the name of the variable  into a property and passing it to the sub component like
// //     return (
// //       <div>
// //         <Navigation user={this.state.user} />
// //         {/* We only want user component to show up if user exists */}
// //         {this.state.user && <Welcome user={this.state.user} />}
// //         <Router>
// //           {/* this is the path to default local host 3000 */}
// //           <Home path="/" user={this.state.user} />
// //           <Login path="/login" />
// //           <Meetings path="/meetings" />
// //           <Register path="/register" />
// //         </Router>
// //       </div>
// //     );
// //   }
// // }

// // export default App;
