import React from "react";
import PropTypes from "prop-types";

function iconLineChart(props) {

  const {tooltip} = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <title>{tooltip}</title>

      <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
      <path d="M13.5 13.48l-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z" />
    </svg>
  );
}

iconLineChart.propTypes = {
  tooltip: PropTypes.string
};

iconLineChart.defaultProps = {
  tooltip: ""
};

export default iconLineChart;
