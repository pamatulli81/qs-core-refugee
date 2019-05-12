import React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";

function chartSvgIcon(props) {
  const { type } = props;

  switch (type) {
    case "LineChart":
      return (
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <title>Line Chart</title>

            <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
            <path d="M13.5 13.48l-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z" />
          </svg>
        </SvgIcon>
      );
    case "ScatterChart":
      return (
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <title>Scatter Chart</title>
            <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
            <circle opacity=".3" cx="11" cy="6" r="2" />
            <circle opacity=".3" cx="16.6" cy="17.6" r="2" />
            <circle opacity=".3" cx="7" cy="14" r="2" />
            <path d="M7 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-10c0-2.21-1.79-4-4-4S7 3.79 7 6s1.79 4 4 4 4-1.79 4-4zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.6 5.6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        </SvgIcon>
      );

    default:
      return (
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <title>Scatter Chart</title>
            <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
            <circle opacity=".3" cx="11" cy="6" r="2" />
            <circle opacity=".3" cx="16.6" cy="17.6" r="2" />
            <circle opacity=".3" cx="7" cy="14" r="2" />
            <path d="M7 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-10c0-2.21-1.79-4-4-4S7 3.79 7 6s1.79 4 4 4 4-1.79 4-4zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.6 5.6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        </SvgIcon>
      );
  }
}

chartSvgIcon.propTypes = {
  type: PropTypes.string.isRequired
};

export default chartSvgIcon;
