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

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  selectToggleChangeHandler = e => {
    const { checked, value, type } = e.target;
    const { toggleValueCallback } = this.props;
    const { checkboxState } = this.state;
    if (this.mounted) {
      this.setState({
        checkboxState: !checkboxState
      });
    }
    const valueToUpdate = type === "checkbox" ? checked : value;

    if (toggleValueCallback) {
      toggleValueCallback(valueToUpdate);
    }
  };

  render() {
    const { checkboxState } = this.state;

    const checkbox = (
      <input
        id="qtoggle"
        name="toggle"
        className="toggle-checkbox"
        type="checkbox"
        onClick={this.selectToggleChangeHandler}
        defaultChecked={checkboxState}
      />
    );

    return (
      <div className="toggle-wrapper">
        <div className="toggle">
          <div className="ad-left">
            <img className="qlikCoreIcon" src={qlikCore} alt="Qlik Core" />
          </div>
          <div className="ad-right">
            {checkbox}
            <label className="toggle-label" htmlFor="qtoggle">
              <span className="toggle-inner" />
              <span className="toggle-switch" />
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
