import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;

    const biggerLead = {
      fontSize: 1.4 + "em",
      fontWeight: 200,
    };

    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div
              className="display-4 text-primary mt-3 mb-2"
              style={{
                fontSize: 2.8 + "em",
              }}
            >
              Meeting Log
            </div>
            <p className="lead" style={biggerLead}>
              This simple app creates meetings, allows people to check in, and
              picks random users to award giveaways. Has an Admin function based on the the Id of each Attendee. The Admin can delete attendees from the meeting.The Admin can also send direct emails to the attendees based on the current users emails
              He can give Each Attendee a Star Rating.Filter and Search for the attendee he wants. 
             
              
              {/* and routing. It's a practical way to learn{" "}
              <a href="https://reactjs.org/">React</a> with{" "}
              <a href="https://firebase.google.com">Firebase</a>. */}
            </p>

            {user == null && (
              <span>
                <Link to="/register" className="btn btn-outline-primary mr-2">  
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-primary mr-2">
                  Log In
                </Link>
              </span>
            )}
            {user && (
              <Link to="/meetings" className="btn btn-primary">
                Meetings
              </Link>
            )}
          </div>{" "}
          {/* columns */}
        </div>
      </div>
    );
  }
}

export default Home;

// import React, { Component } from "react";
// import { Link } from "@reach/router";

// class Home extends Component {
//   // for styling jsx with css it gets {{}} which is an expression with an object of styles.

//   render() {
//     //props are properties of an object like html properties where img and src and alt props

//     const { user } = this.props;

//     const biggerLead = {
//       fontSize: 1.4 + "em",
//       fontWeight: 200,
//     };

//     return (
//       <div className="container text-center">
//         <div className="row justify-content-center">
//           <div className="col-10 col-md-10 col-lg-8 col-xl-7">
//             <div
//               className="display-4 text-primary mt-3 mb-2"
//               style={{
//                 fontSize: 2.8 + "em",
//               }}
//               //internal css in jsx is like creating a javascript object with properties
//             >
//               Meeting Log
//             </div>
//             <p className="lead" style={biggerLead}>
//               This simple app creates meetings, allows people to check in, and
//               picks random users to award giveaways. It's a good example of a
//               Single Page Application which includes connection to a database
//               and routing. It's a practical way to learn
//               <Link to="https://reactjs.org/">React</Link> with
//               <Link to="https://firebase.google.com">Firebase</Link>.
//             </p>
//             {/* This statement means that when there is no user/doesnt exist i.e user=null   then display login and register on the page and not meetings */}
//             {user == null && (
//               <span>
//                 <Link to="/register" className="btn btn-outline-primary mr-2">
//                   Register
//                 </Link>
//                 <Link to="/login" className="btn btn-outline-primary mr-2">
//                   Log In
//                 </Link>
//               </span>
//             )}
//             {/* This means if user exists i.e user has logged in display meetings button*/}
//             {/* This is javascript switch meaning if the statement on the left evaluates to true, it will do the statement on the right */}
//             {user && (
//               <Link to="/meetings" className="btn btn-primary">
//                 Meetings
//               </Link>
//             )}
//           </div>{" "}
//           {/* columns */}
//         </div>
//       </div>
//     );
//   }
// }

// export default Home;
