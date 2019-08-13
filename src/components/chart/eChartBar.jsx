import React from "react";
import PropTypes from "prop-types";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "./eChartBar.css";
import {LABEL_TREND_YEARS, TOOLTIP_NR_OF, TOOLTIP_YEAR, LABEL_LOADING} from "../../constants";

class eChartBar extends React.Component {
  componentDidMount() {
    this.createChart();
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps);
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount() {
    this.barChart.dispose();
  }

  transformData = items => {
    const dims = [];
    const values = [];

    for (let r = 0; r < items.qMatrix.length; r++) {
      for (let c = 0; c < items.qMatrix[r].length; c++) {
        switch (c) {
          case 0:
            dims.push(items.qMatrix[r][c].qText);
            break;
          default:
            values.push(items.qMatrix[r][c].qText);
            break;
        }
      }
    }

    return {
      dims,
      values
    };
  };

  createChart = () => {
    const element = this.container;
    this.barChart = echarts.init(element);
    this.updateChart(this.props);
  };

  updateChart = props => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions(props);
    this.barChart.setOption(newChartOptions);
    return this.barChart;
  };

  makeChartOptions = props => {
    const { layout } = props;
    const data = this.transformData(layout.qHyperCube.qDataPages[0]);

    const option = {
      title: {
        text: ""
      },
      grid: {
        left: 5,
        bottom: 0,
        top: 20,
        height: 200,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        showDelay: 0,
        hideDelay: 50,
        transitionDuration: 0,
        backgroundColor: "rgba(105,105,105,0.7)",
        borderColor: "#000",
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        position(p) {
          return [p[0] + 10, p[1] - 10];
        },
        textStyle: {
          color: "#FFF",
          decoration: "none",
          fontFamily: "Verdana, sans-serif",
          fontSize: 12
        },
        formatter(params, ticket, callback) {
          let res = `${TOOLTIP_YEAR} : ${params[0].name}`;
          for (let i = 0, l = params.length; i < l; i++) {
            res += `${`<br/> ${TOOLTIP_NR_OF} : `}${parseInt(
              params[i].value,
              10
            ).toLocaleString()}`;
          }
          setTimeout(() => {
            callback(ticket, res);
          }, 200);
          return `${LABEL_LOADING}`
        }
      },
      xAxis: {
        type: "category",
        data: data.dims,
        axisLabel: {
          textStyle: {
            color: "#FFF"
          }
        }
      },
      yAxis: {
        type: "value",
        data: data.values,
        show: true,
        axisLabel: {
          textStyle: {
            color: "#FFF",
            fontsize: 4
          }
        }
      },
      series: [
        {
          itemStyle: {
            normal: {
              color: "#8bc34a",
              label: {
                textStyle: {
                  color: "#FFFFFF"
                }
              }
            }
          },
          data: data.values,
          type: "bar"
        }
      ]
    };

    return option;
  };

  render() {
    return (
      <div>
        <a
          href
          className="story-headline-link js-explore"
        >
          <span>{LABEL_TREND_YEARS}</span>
        </a>

        <div
          className="echart-bar"
          ref={elem => {
            this.container = elem;
          }}
        />
      </div>
    );
  }
}

eChartBar.propTypes = {
  layout: PropTypes.object.isRequired
};
export default eChartBar;
