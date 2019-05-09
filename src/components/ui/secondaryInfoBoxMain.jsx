import React from "react";
import PropTypes from "prop-types";
import IconRefugee from "../icon/iconRefugee";
import IconPopulation from "../icon/iconPopulation";
import "./secondaryInfoBoxMain.css";

function SecondaryInfoBoxMain(props) {
  const { layout } = props;

  const styleTop = {
    marginTop: "10px"
  }

  return (
    <div className="explore-data__wrap">
      <div id="TotalPopulationExpression">
        <div className="explore-data__wrap">
          <IconPopulation />
          <p className="explore-data-copy">Total Population</p>
          <h2 className="font-weight--black refugee-count color-by-typemode">
            {layout.mainExpression[0]}
          </h2>
        </div>
      </div>
      <div id="TotalRefugeesExpression">
        <div className="explore-data__wrap">
          <IconRefugee />
          <p className="explore-data-copy" style={styleTop}>{layout.mainExpression[2]}</p>
          <h2 className="font-weight--black refugee-count color-by-typemode">
            {layout.mainExpression[1]}
          </h2>
        </div>
      </div>
    </div>
  );
}

SecondaryInfoBoxMain.propTypes = {
  layout: PropTypes.object.isRequired
};

export default SecondaryInfoBoxMain;
