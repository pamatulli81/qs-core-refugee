import React from "react";
import PropTypes from "prop-types";
import "./primaryInfoBoxStories.css";

function PrimaryInfoBoxStories(props) {
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
            <span className="story-headline-link"> Read more </span>
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
      <aside className="info-label-slider">Learn Why</aside>
      <ul id="story-head" className="list-reset">
        {createStoriesItem()}
      </ul>
    </div>
  );
}

/* PAM: Property Types validation using the Prop Types Plugin */
PrimaryInfoBoxStories.propTypes = {
  layout: PropTypes.object.isRequired,
  nbrOfStories: PropTypes.number
};

PrimaryInfoBoxStories.defaultProps = {
  nbrOfStories: 3
};

export default PrimaryInfoBoxStories;
