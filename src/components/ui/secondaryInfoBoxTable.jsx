import React from "react";
import PropTypes from "prop-types";
import ChartDialog from "../dialog/chartDialog";
import "./secondaryInfoBoxTable.css";

function SecondaryInfoBoxTable(props) {
  const { app, layout } = props;

  const styleCell = {
    size: {
      minWidth: "350px"
    }
  };
  const styleSpan = {
    left: {
      float: "left",
      width: "60%"
    },
    right: {
      float: "right",
      textAlign: "right",

      width: "8%"
    }
  };

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
          <td style={styleCell.size}>
            <span style={styleSpan.left}>
              <a
                data-attribute={`${
                  layout.qHyperCube.qDataPages[0].qMatrix[r][0].qElemNumber
                }`}
                href="https://"
                className="font-weight--book table__link"
              >
                {layout.qHyperCube.qDataPages[0].qMatrix[r][0].qText}
              </a>
            </span>
            <span style={styleSpan.right}>
              <ChartDialog app={app} type="LineChart" value={layout.qHyperCube.qDataPages[0].qMatrix[r][0].qText} />
            </span>
            <span style={styleSpan.right}>
              <ChartDialog app={app} type="SankeyChart" value={layout.qHyperCube.qDataPages[0].qMatrix[r][0].qText} />
            </span>
          </td>
          <td className="font-weight--black color-by-typemode">
            {layout.qHyperCube.qDataPages[0].qMatrix[r][1].qText}
          </td>
          <td className="table__graph color-by-typemode">
            <span
              data-graph-val={`${
                layout.qHyperCube.qDataPages[0].qMatrix[r][2].qText
              }`}
              style={{
                width: `${layout.qHyperCube.qDataPages[0].qMatrix[r][2].qText}%`
              }}
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
  app: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};

SecondaryInfoBoxTable.defaultProps = {};

export default SecondaryInfoBoxTable;
