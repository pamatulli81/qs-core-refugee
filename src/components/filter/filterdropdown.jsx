import React from "react";
import PropTypes from "prop-types";
import "./filterdropdown.css";
import QlikService from "../../qlik/service";
import QlikUtil from "../../qlik/util";

class FilterDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout
    };

     this.selectValueChangeHandler = this.selectValueChangeHandler.bind(this);
  }

  selectValueChangeHandler = e => {
    const { model, layout, selectedValueCallback } = this.props;
    const { value } = e.target;
    // eslint-disable-next-line radix
    QlikService.selectFromList(model, parseInt(value), false);

    if (selectedValueCallback) {
      // eslint-disable-next-line radix
      const elemNumber = parseInt(value);
      const textYear = QlikUtil.getTextFromElemNumber(layout, elemNumber);
      selectedValueCallback(textYear);
    }
  };

  render() {
    const { layout } = this.state;
    const { header } = this.props;

    const styleSelected  = {
      color: "#ffffff"
    };

    const styleExcluded = {
      color: "#C8C8C8"
    };

    const dStyle = {
      display: "block",
      fontSize: "20px"
    };

    function getStyle(item) {
      let style = {};
      let selected = false;
      if (item.qState === "S") {
        style = styleSelected;
        selected = true;
      } else if (item.qState === "X") {
        style = styleExcluded;
      }

      return { style, selected };
    }

    const headerLine = () => {
      return (
        <option value={0} selected key={0}>
          ${header}
        </option>
      );
    };

    const options = layout.qListObject.qDataPages[0].qMatrix.map((dim, i) => {
      const listItemStyles = getStyle(dim[0]);
      return (
        <option
          value={dim[0].qElemNumber}
          selected={listItemStyles.selected}
          key={dim[0].qElemNumber}
        >
          {dim[0].qText}
        </option>
      );
    });

    return (
      <span className="select-wrap">
        <select
          className="select-reset"
          style={dStyle}
          onChange={this.selectValueChangeHandler}
        >
          {options}
        </select>

        <i className="icon icon--dropdown" />
      </span>
    );
  }
}

FilterDropDown.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  selectedValueCallback: PropTypes.func,
  header: PropTypes.string
};

FilterDropDown.defaultProps = {
  selectedValueCallback: null,
  header: ""
};

export default FilterDropDown;
