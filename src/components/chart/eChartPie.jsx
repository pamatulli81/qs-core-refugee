import React from "react";
import PropTypes from "prop-types";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "./eChartPie.css";
import { defPieChart } from "../../definitions";
import QlikService from "../../service/qlik";

class EchartPie extends React.Component {
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
    this.pieChart.dispose();
  }

  transformData = items => {
    const data = [];
    const names = [];

    for (let r = 0; r < items.qMatrix.length; r++) {
      names.push(items.qMatrix[r][0].qText);
      data.push({value: items.qMatrix[r][1].qNum, name: items.qMatrix[r][0].qText});
    }
    return [names, data];
  };

  updateChart = props => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions();
    this.pieChart.setOption(newChartOptions);
    return this.pieChart;
  };

  makeChartOptions = () => {
    const { pieChartLayout } = this.state;
    const qData = this.transformData(pieChartLayout.qHyperCube.qDataPages[0]);
    const qName = pieChartLayout.qHyperCube.qDimensionInfo[0].qFallbackTitle;

    const option = {
      grid: {
        top: "50",
        right: "50",
        bottom: "75",
        left: "75"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: qData[0]
      },
      toolbox: {
        show: true,
        showTitle: false,
        orient: "horizontal",
        feature: {
          saveAsImage: { show: true, showTitle: false }
        }
      },
      series: [
        {
          name: qName,
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "top"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "20",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: qData[1],
        }
      ]
    };

    return option;
  };

  async createChart() {
    const { app, refField, value } = this.props;
    const element = this.container;
    this.pieChart = echarts.init(element);
    const qlikObject = await QlikService.createSessionObject(
      app,
      defPieChart(refField, value)
    );
    if (this.mounted) {
      this.setState({
        pieChartLayout: qlikObject.layout
      });
      this.updateChart(this.props);
    }
  }

  resizeChart() {
    if (this.pieChart != null && this.pieChart !== undefined) {
      this.pieChart.resize();
    }
  }

  render() {
    return (
      <div
        className="echart-pie"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

EchartPie.propTypes = {
  app: PropTypes.object.isRequired,
  refField: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default EchartPie;
