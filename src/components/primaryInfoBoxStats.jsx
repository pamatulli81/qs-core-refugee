import React from "react";
import PropTypes from "prop-types";

export default function InfoBoxStats(props) {
  /* PAM: Render React Component */
  const { nbrOfPerson, nbrOfCountry, nbrOfAsylumCountry } = props;

  const fontSize = {
    fontSize: "25px"
  };

  const styleTrend = {
    fontSize: "16px",
    marginTop: "20px"
  };

  const marginTop = {
    marginTop: "20px"
  };

  return (
    <div className="primary">
      <div style={marginTop}>
        <div className="color-by-typemode primary__copy js-explore">
          <span className="font-weight--black datum" style={fontSize}>
            {nbrOfPerson}
          </span>
          <p>
            <span> persons </span>
            <span className="color-by-typemode type-mode-button type-mode-statement">
              from
            </span>
            <span>
              <span> {nbrOfCountry}</span> countries
            </span>
            <span>
              &nbsp;asked for reallocation to {nbrOfAsylumCountry}
              <span />
              &nbsp;countries
            </span>
          </p>
        </div>
      </div>
      <a
        href="https://"
        className="story-headline-link js-explore"
        style={styleTrend}
      >
        <span>Last 7 Years Trend</span>
      </a>
    </div>
  );
}

/* PAM: Property Types validation using the Prop Types Plugin */
InfoBoxStats.propTypes = {
  nbrOfPerson: PropTypes.string.isRequired,
  nbrOfCountry: PropTypes.number.isRequired,
  nbrOfAsylumCountry: PropTypes.number.isRequired
};
