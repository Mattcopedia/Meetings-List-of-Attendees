import React, { Component } from "react";

//this.props the props is coming from the parent component

class FormError extends Component {
  render() {
    const { theMessage } = this.props;

    return <div className="col-12 alert alert-danger px-3">{theMessage}</div>;
  }
}
export default FormError;
