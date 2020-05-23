import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class BackButton extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon
          fontSize="large"
          className="homeIcon"
          onClick={this.props.history.goBack}
        >
          arrow_back
        </Icon>
      </React.Fragment>
    );
  }
}

export default withRouter(BackButton);
