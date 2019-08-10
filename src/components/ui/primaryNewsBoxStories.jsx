import React from "react";
import PropTypes from "prop-types";
import "./primaryNewsBoxStories.css";
import {LABEL_LEARN_WHY, LABEL_READ_MORE} from "../../constants";

function PrimaryNewsBoxStories(props) {
  const { nbrOfStories, layout } = props;

  const styleContent = {
    transform: {
      transformOrigin: "center 50% 0px",
      transform: "matrix(1, 0, 0, 1, 0, 0)"
    },
    link: {
      position: "absolute; left: 0%"
    }
  };

  const createStoriesItem = () => {
    const items = [];
    for (let r = 0; r < nbrOfStories; r++) {
      items.push(
        <li className="story-preview" key={r}>
          <a
            className="link-reset"
            href={`${layout.qHyperCube.qDataPages[0].qMatrix[r][4].qText}`}
          >
            <aside className="story-preview-data">
              {" "}
              {layout.qHyperCube.qDataPages[0].qMatrix[r][1].qText}
            </aside>
            <h4 className="story-preview-title">
              {layout.qHyperCube.qDataPages[0].qMatrix[r][2].qText}
            </h4>
            <p>{layout.qHyperCube.qDataPages[0].qMatrix[r][3].qText}</p>
            <span className="story-headline-link"> {LABEL_READ_MORE} </span>
          </a>
        </li>
      );
    }
    return items;
  };

  return (
    <div
      className="info-box stories"
      data-3dhover=""
      style={styleContent.transform}
    >
      <aside className="info-label-slider">{LABEL_LEARN_WHY}</aside>
      <ul id="story-head" className="list-reset">
        {createStoriesItem()}
      </ul>
    </div>
  );
}

PrimaryNewsBoxStories.propTypes = {
  layout: PropTypes.object.isRequired,
  nbrOfStories: PropTypes.number
};

PrimaryNewsBoxStories.defaultProps = {
  nbrOfStories: 3
};

export default PrimaryNewsBoxStories;
