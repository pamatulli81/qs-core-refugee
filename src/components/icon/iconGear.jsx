import React from "react";
import PropTypes from "prop-types";
import "./iconGear.css";

function iconGear(props) {
  const styleGlobe = {
    backgroundColor: "none"
  }
  const {tooltip} = props;

  return (
    
    <svg
      width="24px"
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-globe"
      style={styleGlobe}
    >
      <title id="title" lang="en">{tooltip}</title>
      <g transform="rotate(-23.5 50 50)">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="#8bc449"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <ellipse
          cx="50"
          cy="50"
          ry="0.1"
          ng-attr-rx="{{config.radius}}"
          fill="none"
          rx="40"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <ellipse
          cx="50"
          cy="50"
          ng-attr-ry="{{config.radius}}"
          fill="none"
          ry="40"
          stroke="#ffffff"
          strokeWidth="3"
          rx="38.6767"
        >
          <animate
            attributeName="rx"
            calcMode="linear"
            values="40;0;40"
            keyTimes="0;0.5;1"
            dur="1"
            begin="0s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="50"
          cy="50"
          fill="none"
          ry="40"
          stroke="#ffffff"
          strokeWidth="3"
          rx="14.6833"
        >
          <animate
            attributeName="rx"
            calcMode="linear"
            values="40;0;40"
            keyTimes="0;0.5;1"
            dur="1"
            begin="-0.333s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="50"
          cy="50"
          fill="none"
          ry="40"
          stroke="#ffffff"
          strokeWidth="3"
          rx="12.0127"
        >
          <animate
            attributeName="rx"
            calcMode="linear"
            values="40;0;40"           
            dur="1"
            begin="-0.6667s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
    </svg>
  );
}

iconGear.propTypes = {
  tooltip: PropTypes.string
};

iconGear.defaultProps = {
  tooltip: ""
};

export default iconGear;
