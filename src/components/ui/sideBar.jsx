import React, { Component } from "react";
import PropTypes from "prop-types";
import IconGear from "../icon/iconGear";
import "./sideBar.css";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      map: false
    };
  }

  showMapClickHandler = () => {
    const { showMapCallback } = this.props;
    const { map } = this.state;

    this.setState({
      map: !map
    });

    if (showMapCallback) {
      // eslint-disable-next-line react/destructuring-assignment
      showMapCallback(this.state.map);
    }
  };

  render() {
    return (
      <div className="map-config">
        <div className="spin-icon">
          <span onClick={this.showMapClickHandler}>
            <IconGear />
          </span>
        </div>
      </div>
    );
  }
}

/* PAM: Property Types validation using the Prop Types Plugin */
SideBar.propTypes = {
  showMapCallback: PropTypes.func
};

SideBar.defaultProps = {
  showMapCallback: null
};

export default SideBar;
