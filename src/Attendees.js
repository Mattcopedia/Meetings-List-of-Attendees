import React, { Component } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      allAttendees: [],
      displayAttendees: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on("value", (snapshot) => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });
      }
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList,
      });
    });
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  chooseRandom() {
    const randomAttendee = Math.floor(
      Math.random() * this.state.allAttendees.length
    );
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]],
    });
  }

  resetQuery() {
    this.setState({
      displayAttendees: this.state.allAttendees,
      searchQuery: "",
    });
  }

  render() {
    const dataFilter = (item) =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>

            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Pick a random attendee"
                      onClick={() => this.chooseRandom()}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info "
                      title="Reset Search"
                      onClick={() => this.resetQuery()}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          userID={this.props.userID}
          meetingID={this.props.meetingID}
          adminUser={this.props.adminUser}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}

export default Attendees;

// //Here  we display the list of attendees from firebase using displayAttendees: []
// //whenvever the value changes in displayName create a snapshot of it in the database using ref.on(value,snapshot)
// // note All attendees is all the meetings users in the database while display attendees is the meeting users we want to show on the page
// import React, { Component } from "react";
// import firebase from "./Firebase";
// import AttendeesList from "./AttendeesList";
// import { FaUndo, FaRandom } from "react-icons/fa";

// class Attendees extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // we set a state for searchQuery
//       searchQuery: "",
//       allAttendees: [],
//       displayAttendees: [],
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.resetQuery = this.resetQuery.bind(this);
//     this.chooseRandom = this.chooseRandom.bind(this);
//   }

//   componentDidMount() {
//     const ref = firebase
//       .database()
//       .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

//     ref.on("value", (snapshot) => {
//       let attendees = snapshot.val();
//       let attendeesList = [];
//       for (let item in attendees) {
//         attendeesList.push({
//           attendeeID: item,
//           attendeeName: attendees[item].attendeeName,
//           attendeeEmail: attendees[item].attendeeEmail,
//           star: attendees[item].star,
//         });
//       }
//       this.setState({
//         allAttendees: attendeesList,
//         displayAttendees: attendeesList,
//       });
//     });
//   }

//   handleChange(e) {
//     const itemName = e.target.name;
//     const itemValue = e.target.value;

//     this.setState({ [itemName]: itemValue });
//   }

//   //random is a javascript function that gives you a number between 0 and 1
//   //.floor then allows you to take that number and round it up so the number doesnt have decimal units in it.
//   //.allAttendees.length,  we create a new variable that holds all the attendees
//   chooseRandom() {
//     const randomAttendee = Math.floor(
//       Math.random() * this.state.allAttendees.length
//     );
//     this.resetQuery();
//     this.setState({
//       // this will setstate will show only one attendee from the list of all attendees using our random number
//       displayAttendees: [this.state.allAttendees[randomAttendee]],
//     });
//   }

//   // in the render method we create a filter for the search form input field
//   // we use the match function to search for the words in the search Query
//   // we also use filter functions to filter the search name
//   // we use match and filter in javascript to create live search forms

//   // reset function is to make the search form blank when you click it
//   // and reset the  attendees list page to its former look

//   resetQuery() {
//     this.setState({
//       // here on immediate next line we reset the value of displayAttendees so it matches the value of all attendees and resets it back to
//       //the list of all attendees
//       displayAttendees: this.state.allAttendees,
//       searchQuery: "",
//     });
//   }

//   render() {
//     const dataFilter = (item) =>
//       item.attendeeName
//         .toLowerCase()
//         .match(this.state.searchQuery.toLowerCase()) && true;

//     const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

//     return (
//       <div className="container mt-4">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <h1 className="font-weight-light text-center">Attendees</h1>

//             <div className="card bg-light mb-4">
//               <div className="card-body text-center">
//                 <div className="input-group input-group-lg">
//                   <input
//                     type="text"
//                     name="searchQuery"
//                     value={this.state.searchQuery}
//                     placeholder="Search Attendees"
//                     className="form-control"
//                     onChange={this.handleChange}
//                   />

//                   <div className="input-group-append">
//                     <button
//                       className="btn btn-sm btn-outline-info"
//                       title="Reset search"
//                       onClick={() => this.resetQuery()}
//                       // anytime you have a function call you need to put a parenthesis in front of it like this.resetQuery()
//                       // but expressions are complete by itself and dont require () e.g this.handlechange
//                     >
//                       <FaUndo />
//                     </button>

//                     <button
//                       className="btn btn-sm btn-outline-info"
//                       title="Pick a random attendee"
//                       onClick={() => this.chooseRandom()}
//                     >
//                       <FaRandom />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <AttendeesList
//           userID={this.props.userID}
//           meetingID={this.props.meetingID}
//           adminUser={this.props.adminUser}
//           //instead of using display attendees which is kind of hardcoded we can use filtered attendees which are dynamic
//           // attendees={this.state.displayAttendees}

//           attendees={filteredAttendees}
//         />
//       </div>
//     );
//   }
// }

// export default Attendees;
