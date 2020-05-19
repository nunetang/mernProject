import React, { Component } from "react";

import Button from "@material-ui/core/Button";

class SpecialButton extends Component {
  render() {
    return (
      <div className="fabButtonDiv">


        <Button
          style={{
            backgroundColor: this.props.bgcolor
          }}
          color={this.props.color}
          disabled={this.props.disabled}
          className="fabButton"
          variant="contained"
          size={this.props.size}
          aria-label="Add"
          type={this.props.type}
          value={this.props.value}
        >
          {this.props.title}
        </Button>
      </div>
    );
  }
}

export default SpecialButton;
