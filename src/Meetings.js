import React, { Component } from "react";
import MeetingsList from "./MeetingsList";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: "",
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
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: "" });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.handleSubmit}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="meetingName"
                      placeholder="Meeting name"
                      aria-describedby="buttonAdd"
                      value={this.state.meetingName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* we first check if the meetings are available then we display your meetings */}
          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.meetings && this.props.meetings.length ? (
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Meetings
                  </h4>
                </div>
              ) : null}

              {this.props.meetings && (
                <div className="list-group list-group-flush">
                  <MeetingsList
                    userID={this.props.userID}
                    meetings={this.props.meetings}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meetings;
/* // import React, { Component } from "react";

// class Meetings extends Component {
//   constructor(props) {
//     // puttins props here makes it to be available anywhere in my application

//     super(props);
//     this.state = {
//       meetingName: " ",
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const itemName = e.target.name;
//     const itemValue = e.target.value;

//     this.setState({ [itemName]: itemValue });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     // we will use sign in the email and password auth function in firebase for this login page rather than create email and password
//     this.props.addMeeting(this.state.meetingName);
//     this.setState({ meetingName: "" });
//   }

//   render() {
//     return (
//       <div className="container mt-4">
//         <div className="row justify-content-center">
//           <div className="col-md-8 text-center">
//             <h1 className="font-weight-light">Add a Meeting</h1>
//             <div className="card bg-light">
//               <div className="card-body text-center">
//                 <form className="formgroup">
                  // <div
                  //   className="input-group input-group-lg"
                    // onSubmit={this.,handleSubmit}
                  // >
                  //   <input
                  //     type="text"
                  //     className="form-control"
                  //     name="meetingName"
                  //     placeholder="Meeting name"
                  //     aria-describedby="buttonAdd"
                  //     value={this.state.meetingNam}
                  //     onChange={this.,handleChange}
                  //   />
//                     <div className="input-group-append">
//                       <button
//                         type="submit"
//                         className="btn btn-sm btn-info"
//                         id="buttonAdd"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// } 

// export default Meetings;

// import React, { Component } from "react";
// // refreshing of the browser causes us to lose state data stored in components
// // that is why we have to use routers and link component rather than regular anchor links
// class Meetings extends Component {
//   render() {
//     return (
//       <div className="text-center mt-4">
//         <h1 className="text-primary">Meetings</h1>
//       </div>
//     );
//   }
// }

// export default Meetings; */
//
