import React from "react";
import PropTypes from "prop-types";
import refugee from "../../resources/icon_refugee.png";

export default function PrimaryNewsBoxStats(props) {
  /* PAM: Render React Component */
  const { layout, toggle } = props;

  const styleFont = {
    fontSize: "25px"
  };

  const styleLeft = {
    float: "left",
    width: "15%",
    height: "100%"
  };

  const styleRight = {
    float: "right",
    width: "85%",
    height: "100%"
  };

  const styleColor = {
    color: "white"
  };

  const styleRefugee = {
    width: "60%",
    height: "60%",
    paddingTop: "10px"
  };

  const styleSection = {
    width: "100%",
    height: "100px"
  };

  return (
    <section style={styleSection}>
      <span style={styleLeft}>
        <img src={refugee} style={styleRefugee} alt="Stats" />
      </span>
      <span style={styleRight}>
        <div className="primary">
          <div>
            <div className="color-by-typemode primary__copy js-explore">
              <span className="font-weight--black datum" style={styleFont}>
                {layout.statsExpression[0]}
              </span>
              <p>
                <span style={styleColor}> persons from</span>
                <span>
                  <span>  {layout.statsExpression[2]}</span>
                </span>
                <span style={styleColor}>
                  &nbsp;countries asked for reallocation to
                  <span />
                </span>
                <span> {layout.statsExpression[1]}</span>
                <span style={styleColor}>&nbsp;countries</span>
              </p>
            </div>
          </div>
        </div>
      </span>
    </section>
  );
}

PrimaryNewsBoxStats.propTypes = {
  layout: PropTypes.object.isRequired,
  toggle: PropTypes.bool.isRequired
};
