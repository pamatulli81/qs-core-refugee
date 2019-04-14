import React from "react";
import PropTypes from "prop-types";
import "./secondaryInfoBoxTable.css";

function SecondaryInfoBoxTable(props) {
  const { layout } = props;

  const createTableRows = () => {
    const rows = [];

    for (let r = 0; r < layout.qHyperCube.qDataPages[0].qMatrix.length; r++) {
      rows.push(
        <tr key={r}>
          <td>
            <a
              data-attribute={`${
                layout.qHyperCube.qDataPages[0].qMatrix[r][0].qElemNumber
              }`}
              href="https://"
              className="font-weight--book table__link"
            >
              {r + 1}
            </a>
          </td>
          <td>
            <a
              data-attribute={`${
                layout.qHyperCube.qDataPages[0].qMatrix[r][0].qElemNumber
              }`}
              href="https://"
              className="font-weight--book table__link"
            >
              {layout.qHyperCube.qDataPages[0].qMatrix[r][0].qText}
            </a>
          </td>
          <td className="font-weight--black color-by-typemode">
            {layout.qHyperCube.qDataPages[0].qMatrix[r][1].qText}
          </td>
          <td className="table__graph color-by-typemode">
            <span
              data-graph-val={`${
                layout.qHyperCube.qDataPages[0].qMatrix[r][2].qText
              }`}
              style={{ width: `${layout.qHyperCube.qDataPages[0].qMatrix[r][2].qText}%` }}
            />
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <table className="table--refugee-pop">
      <tbody>{createTableRows()}</tbody>
    </table>
  );
}

/* PAM: Property Types validation using the Prop Types Plugin */
SecondaryInfoBoxTable.propTypes = {
  layout: PropTypes.object.isRequired
};

SecondaryInfoBoxTable.defaultProps = {};

export default SecondaryInfoBoxTable;
