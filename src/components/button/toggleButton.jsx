import React from "react";
import PropTypes from "prop-types";
import "./toggleButton.css";
import qlikCore from "../../resources/qlikcore-logo.svg";

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxState: props.toggle
    };
    this.selectToggleChangeHandler = this.selectToggleChangeHandler.bind(this);
  }

  selectToggleChangeHandler = e => {
    const { checked, value, type } = e.target;
    const { toggleValueCallback } = this.props;
    const {checkboxState} = this.state;
    this.setState({
      checkboxState: !checkboxState
    });
    const valueToUpdate = type === "checkbox" ? checked : value;

    if (toggleValueCallback) {
      toggleValueCallback(valueToUpdate);
    }
  };

  render() {

    const{checkboxState} = this.state;
    
    const checkbox = (
      <input
        id="qcountryswitch"
        name="countryswitch"
        className="countryswitch-checkbox"
        type="checkbox"
        onClick={this.selectToggleChangeHandler}
        defaultChecked={checkboxState}
      />
    );

    return (
      <div className="countryswitch-wrapper">
        <div className="countryswitch">
          <div className="ad-left">
            <img className="qlikCoreIcon" src={qlikCore} alt="Qlik Core" />
          </div>
          <div className="ad-right">
            {checkbox}
            <label className="countryswitch-label" htmlFor="qcountryswitch">
              <span className="countryswitch-inner" />
              <span className="countryswitch-switch" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  toggleValueCallback: PropTypes.func,
  toggle: PropTypes.bool.isRequired
};

ToggleButton.defaultProps = {
  toggleValueCallback: null
};

export default ToggleButton;
