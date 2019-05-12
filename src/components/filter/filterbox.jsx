import React from "react";
import PropTypes from "prop-types";
import "./filterbox.css";
import QlikService from "../../qlik/service";

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
      selected: []
    };

    props.model.on("changed", () => this.updateLayout());
  }

  selectValueClickHandler = (dim, i) => {
    const { selected, layout, name } = this.state;
    const { model, selectedValueCallback, alwaysOneSelectedValue } = this.props;

    if (alwaysOneSelectedValue) {
      QlikService.selectFromList(model, [dim.qElemNumber], false);
      selected.length = 0;
      selected.push(dim.qElemNumber);
    } else {
      if (selected.indexOf(dim.qElemNumber) < 0) {
        selected.push(dim.qElemNumber);
      } else {
        selected.splice(selected.indexOf(dim.qElemNumber), 1);
      }
      QlikService.selectFromList(model, [dim.qElemNumber], true);
    }

    if (selectedValueCallback) {
      let value = "";
      if (selected.length > 1) {
        value = `selected ${name}`;
      } else if (selected.length === 1) {
        value = layout.qListObject.qDataPages[0].qMatrix[i][0].qText;
      }
      selectedValueCallback(value);
    }

    this.setState(selected);
  };

  clearFilterClickHandler = () => {
    const {
      app,
      field    
    } = this.props;

    QlikService.clearField(app, field);
  };

  async updateLayout() {
    const { model } = this.props;
    const layout = await model.getLayout();
    this.setState({ layout });
  }

  render() {
    const { layout } = this.state;
    const { name } = this.props;

    const styleSelected = {
      color: "#ffffff"
    };

    const styleExcluded = {
      color: "#C8C8C8"
    };

    const styleLeftClearX = {
      float: "left"
    };

    const styleRightClearX = {
      float: "right",
      paddingRight: "8px",
      cursor: "pointer"
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

    const dimensions = layout.qListObject.qDataPages[0].qMatrix.map(
      (dim, i) => {
        const listItemStyles = getStyle(dim[0]);
        return (
          <div
            onClick={() => {
              this.selectValueClickHandler(dim[0], i);
            }}
            key={dim[0].qElemNumber}
            title={dim[0].qText}
            style={listItemStyles.style}
            role="presentation"
          >
            <span className="listText">{dim[0].qText}</span>
            <span className="listIcon">
              {listItemStyles.selected ? "✔" : null}
            </span>
          </div>
        );
      }
    );

    return (
      <div className="filterbox">
        <div className="title">
          <span style={styleLeftClearX}>{name}</span>
          <span
            onClick={this.clearFilterClickHandler}
            style={styleRightClearX}
            role="presentation"
          >
            ✖
          </span>
        </div>
        <div className="list">{dimensions}</div>
      </div>
    );
  }
}

/* PAM: Property Types validation using the Prop Types Plugin */
Filterbox.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  name: PropTypes.string,
  alwaysOneSelectedValue: PropTypes.bool,
  selectedValueCallback: PropTypes.func,
  app:PropTypes.object.isRequired
};

Filterbox.defaultProps = {
  selectedValueCallback: null,
  alwaysOneSelectedValue: true,
  name: ""
};

export default Filterbox;
