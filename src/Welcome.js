import React, { Component } from "react";
import { Link } from "@reach/router";

class Welcome extends Component {
  render() {
    const { userName, logOutUser } = this.props;

    return (
      <div className="text-center mt-4">
        <span className="text-secondary font-weight-bold pl-1">
          Welcome {userName}
        </span>
        ,
        <Link
          to="/login"
          className="font-weight-bold text-primary pl-1"
          onClick={(e) => logOutUser(e)}
        >
          log out
        </Link>
      </div>
    );
  }
}

export default Welcome;

// import React, { Component } from "react";

// class Welcome extends Component {
//   // for styling jsx with css it gets {{}} which is an expression with an object of styles.

//   render() {
//     //props are properties of an object like html properties where img and src and alt props

//     const { user } = this.props;

//     // we are importing user variable that we will pass down to the component below from the props
//     return (
//       <div className="text-center mt-4 ">
//         <span className="text-secondary font-weight-bold text-primary pt-1">
//           {/* We only want user component to show up if user exists */}
//           Welcome {user}
//         </span>
//         ,
//         <a href="/" className="font-weight bold text-primary pl-1">
//           Log Out
//         </a>
//       </div>
//     );
//   }
// }

// export default Welcome;
