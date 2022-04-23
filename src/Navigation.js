import React, { Component } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "@reach/router";
class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaUsers className="mr-1" /> Meeting Log
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <Link className="nav-item nav-link" to="/meetings">
                meetings
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/login">
                log in
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/register">
                register
              </Link>
            )}
            {user && (
              <Link
                className="nav-item nav-link"
                to="/login"
                onClick={(e) => logOutUser(e)}
              >
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;

// import React, { Component } from "react";
// import { FaUsers } from "react-icons/fa";
// import { Link } from "@reach/router";

// class Navigation extends Component {
//   // for styling jsx with css it gets {{}} which is an expression with an object of styles.

//   render() {
//     //props are properties of an object like html properties where img and src and alt props

//     const { user } = this.props;

//     // we are importing user variable that we will pass down to the component below from the props
//     return (
//       <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
//         <div className="container-fluid">
//           <Link href="/" className="navbar-brand">
//             {/* call the exact name of the icon to render it which resembles the import name */}
//             <FaUsers className="mr-1" /> Meeting Log
//           </Link>
//           <div className="navbar-nav ml-auto">
//             {user && (
//               <Link className="nav-item nav-link" to="/meetings">
//                 meetings
//               </Link>
//             )}

//             {/* if there is not a user render the login button and register button */}
//             {!user && (
//               <Link className="nav-item nav-link" to="/login">
//                 log in
//               </Link>
//             )}
//             {!user && (
//               <Link className="nav-item nav-link" to="/register">
//                 register
//               </Link>
//             )}
//             {/* if there is a user show logout  */}
//             {user && (
//               <Link className="nav-item nav-link" to="/login">
//                 log out
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navigation;
