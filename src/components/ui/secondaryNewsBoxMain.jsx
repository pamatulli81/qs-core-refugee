import React from "react";
import PropTypes from "prop-types";
import IconRefugee from "../icon/iconRefugee";
import IconPopulation from "../icon/iconPopulation";
import "./secondaryNewsBoxMain.css";
import {LABEL_TOTAL_POPULATION} from "../../constants";

function SecondaryNewsBoxMain(props) {
  const { layout } = props;  

  return (
    <div className="explore-data__wrap">
      <div id="TotalPopulationExpression">
        <div className="explore-data__wrap">
          <IconPopulation />
          <p className="explore-data-copy">{LABEL_TOTAL_POPULATION}</p>
          <h2 className="font-weight--black refugee-count color-by-typemode">
            {layout.mainExpression[0]}
          </h2>
        </div>
      </div>
      <div id="TotalRefugeesExpression">
        <div className="explore-data__wrap">
          <IconRefugee />
          <p className="explore-data-copy">{layout.mainExpression[2]}</p>
          <h2 className="font-weight--black refugee-count color-by-typemode">
            {layout.mainExpression[1]}
          </h2>
        </div>
      </div>
    </div>
  );
}

SecondaryNewsBoxMain.propTypes = {
  layout: PropTypes.object.isRequired
};

export default SecondaryNewsBoxMain;
