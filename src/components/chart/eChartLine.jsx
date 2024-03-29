import React from "react";
import PropTypes from "prop-types";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "./eChartLine.css";
import { defLineChart } from "../../definitions";
import QlikService from "../../service/qlik";

class EchartLine extends React.Component {
  constructor(props) {
    super(props);
    this.resizeChart = this.resizeChart.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.createChart();
    window.addEventListener("resize", this.resizeChart, false);
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps);
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener("resize", this.resizeChart, false);
    this.lineChart.dispose();
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

  updateChart = props => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions();
    this.lineChart.setOption(newChartOptions);
    return this.lineChart;
  };

  makeChartOptions = () => {
    const { lineChartLayout } = this.state;
    const data = this.transformData(lineChartLayout.qHyperCube.qDataPages[0]);

    const option = {
      grid: {
        top: "50",
        right: "50",
        bottom: "75",
        left: "75"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      toolbox: {
        show: true,
        showTitle: false,
        orient: "horizontal",
        feature: {
          mark: { show: true, showTitle: false },
          magicType: { show: true, type: ["line", "bar"], showTitle: false },
          saveAsImage: { show: true, showTitle: false }
        }
      },
      calculable: true,
      xAxis: {
        type: "category",
        data: data.dims
      },
      yAxis: {
        type: "value"
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 60,
          end: 100,
          pos: 6
        }
      ],
      series: [
        {
          data: data.values,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "#8bc34a",
              label: {
                textStyle: {
                  color: "#FFFFFF"
                }
              }
            }
          }
        }
      ]
    };

    return option;
  };

  async createChart() {
    const { app, refField, value } = this.props;
    const element = this.container;
    this.lineChart = echarts.init(element);
    const qlikObject = await QlikService.createSessionObject(
      app,
      defLineChart(refField, value)
    );
    if (this.mounted) {
      this.setState({
        lineChartLayout: qlikObject.layout
      });
    }
    this.updateChart(this.props);
  }

  resizeChart() {
    if (this.lineChart !== null && this.lineChart !== undefined) {
      this.lineChart.resize();
    }
  }

  render() {
    return (
      <div
        className="echart-line"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

EchartLine.propTypes = {
  app: PropTypes.object.isRequired,
  refField: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default EchartLine;
