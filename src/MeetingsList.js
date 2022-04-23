import React, { Component } from "react";
import firebase from "./Firebase";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import { navigate } from "@reach/router";

class MeetingsList extends Component {
  constructor(props) {
    super(props);
    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  };

  render() {
    const { meetings } = this.props;
    const myMeetings = meetings.map((item) => {
      return (
        <div className="list-group-item d-flex" key={item.meetingID}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Meeting"
              onClick={(e) => this.deleteMeeting(e, item.meetingID)}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              onClick={() =>
                navigate(`/checkin/${this.props.userID}/${item.meetingID}`)
              }
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={() =>
                navigate(`/attendees/${this.props.userID}/${item.meetingID}`)
              }
            >
              <GoListUnordered />
            </button>
          </section>

          <section className="pl-3 text-left align-self-center">
            {item.meetingName}
          </section>
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingsList;

// import React, { Component } from "react";
// import firebase from "./Firebase";
// import { GoTrashcan } from "react-icons/go";
// import { navigate } from "@reach/router";
// import { FaLink } from "react-icons/fa";
// import { GoListUnordered } from "react-icons/go";

// class MeetingsList extends Component {
//   constructor(props) {
//     super(props);
//     this.deleteMeeting = this.deleteMeeting.bind(this);
//   }

//   deleteMeeting = (e, whichMeeting) => {
//     e.preventDefault();
//     const ref = firebase
//       .database()
//       .ref(`meetings/${this.props.userID}/${whichMeeting}`);
//     ref.remove();
//   };

//   render() {
//     const { meetings } = this.props;
//     const myMeetings = meetings.map((item) => {
//       return (
//         <div className="list-group-item d-flex" key={item.meetingID}>
//           <section
//             className="btn-group align-self-center"
//             role="group"
//             aria-label="Meeting Options"
//           >
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               title="Delete Meeting"
//               onClick={(e) => this.deleteMeeting(e, item.meetingID)}
//             >
//               <GoTrashcan />
//             </button>
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               title="Check In"
//               onClick={() =>
//                 navigate(`/checkin/${this.props.userID}/${item.meetingID}`)
//               }
//             >
//               <FaLink />
//             </button>
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               title="Attendees List"
//               onClick={() =>
//                 navigate(`/attendees/${this.props.userID}/${item.meetingID}`)
//               }
//             >
//               <GoListUnordered />
//             </button>
//           </section>

//           <section className="pl-3 text-left align-self-center">
//             {item.meetingName}
//           </section>
//         </div>
//       );
//     });

//     return <div>{myMeetings}</div>;
//   }
// }

// export default MeetingsList;

// // import React, { Component } from "react";
// // import firebase from "firebase";
// // import { GoTrashcan } from "react-icons/go";
// // import { FaLink } from "react-icons/fa";

// // import { navigate } from "@reach/router";

// // class MeetingsList extends Component {
// //   // to delete a meeting we make reference to the meeting then the userid and id of the meeting
// //   // we then use ref.remove to finally delete the item

// //   constructor(props) {
// //     super(props);
// //     this.deleteMeeting = this.deleteMeeting.bind(this);
// //   }
// //   deleteMeeting = (e, whichMeeting) => {
// //     e.preventDefault();
// //     const ref = firebase
// //       .database()
// //       .ref(`meetings/${this.props.userID}/${whichMeeting}`);
// //     ref.remove();
// //   };

// //   render() {
// //     const { meetings } = this.props;
// //     const myMeetings = meetings.map((item) => {
// //       return (
// //         <div className="list-group-item d-flex" key={item.meetingID}>
// //           {/* We are now going to add buttons to deleta a meeting */}

// //           <section
// //             //   btn-group is a bootstrap way of grouping buttons
// //             className="btn-group align-self-center"
// //             role="group"
// //             aria-label="Meeting Options"
// //           >
// //             <button
// //               className="btn btn-sm btn-outline-secondary"
// //               title="Delete Meeting"
// //               onClick={(e) => this.deleteMeeting(e, item.meetingID)}
// //             >
// //               <GoTrashcan />
// //             </button>
// //             {/* next we allow people to check into our meetings */}
// //             <button
// //               className="btn btn-sm btn-outline-secondary"
// //               title="Check In"
// //               onClick={() =>
// //                 navigate(`/check/${this.props.userID}/${item.meetingID}`)
// //               }
// //             >
// //               <FaLink />
// //             </button>
// //           </section>

// //           <section className="pl-3 text-left align-self-center">
// //             {item.meetingName}
// //           </section>
// //         </div>
// //       );
// //     });

// //     // what we are trying to do is to grab all the meetings and then map them/display them to some html, displaying the meeting name using item.meetingname
// //     return <div>{myMeetings}</div>;
// //   }
// // }

// // export default MeetingsList;
