import React from "react";
import PropTypes from "prop-types";
import "./secondaryInfoBoxMain.css";

function SecondaryInfoBoxMain(props) {
  const { layout, person } = props;

  return (
    <div className="explore-data__wrap">
      <div id="TotalPopulationExpression">
        <div className="explore-data__wrap">
          <p className="explore-data-copy">Total Population</p>
          <h2 className="font-weight--black refugee-count">
            {layout.mainExpression[0]}
          </h2>
        </div>
      </div>
      <div id="TotalRefugeesExpression">
        <div className="explore-data__wrap">
          <p className="explore-data-copy">{person}</p>
          <h2 className="font-weight--black refugee-count color-by-typemode">
            {layout.mainExpression[1]}
          </h2>
        </div>
      </div>
    </div>
  );
}

SecondaryInfoBoxMain.propTypes = {
  layout: PropTypes.object.isRequired,
  person: PropTypes.string
};

SecondaryInfoBoxMain.defaultProps = {
  person: "All person Types"
};

export default SecondaryInfoBoxMain;
