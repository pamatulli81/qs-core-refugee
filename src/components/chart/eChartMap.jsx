import React from "react";
import "./eChartMap.css";
import * as echarts from "echarts";
import "echarts/lib/chart/lines";
import "echarts-gl";
import "echarts-stat";
import "echarts/extension/dataTool";
import "echarts/map/js/world";

class EChartMap extends React.Component {
  constructor(props) {
    super(props);
    this.resizeChart = this.resizeChart.bind(this);
  }

  componentDidMount() {
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
    window.removeEventListener("resize", this.resizeChart, false);
    this.mapChart.dispose();
  }

  eCleanArray = item => {
    let data = item;
    data = data.qText.replace("[", "");
    data = data.replace("]", "");
    data = data.split(",");
    data = [parseFloat(data[0]), parseFloat(data[1])];

    return data;
  };

  eCreateData = items => {
    const obj = {
      routes: [],
      values: [],
      markPoint: {
        from: [],
        to: []
      }
    };

    items.forEach(item => {
      const from = this.eCleanArray(item[1]);
      const to = this.eCleanArray(item[3]);

      obj.routes.push([from, to]);
      obj.markPoint.from.push(from);
      obj.markPoint.to.push(to);
      obj.values.push(item[4].qNum);
    });

    return obj;
  };

  createChart = () => {
    const element = this.container;
    this.mapChart = echarts.init(element);
    this.updateChart(this.props);
  };

  updateChart = props => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions(props);
    this.mapChart.setOption(newChartOptions);
    return this.mapChart;
  };

  makeChartOptions = props => {
    const { layout } = props;
    const data = this.eCreateData(layout.qHyperCube.qDataPages[0].qMatrix);

    const option = {
      title: {
        text: "",
        left: "center",
        textStyle: {
          color: "#eee"
        }
      },
      tooltip: {},
      legend: {
        orient: "vertical",
        left: "top",
        data: ["Origin Country", "Asylum Country"]
      },
      geo: {
        map: "world",
        left: 0,
        right: 0,
        silent: false,
        roam: true,
        itemStyle: {
          normal: {
            borderColor: "#ccc",
            color: "rgba(50, 62, 83, 0.4)"
          }
        }
      },
      series: [
        {
          type: "lines",
          coordinateSystem: "geo",
          data: data.routes,
          large: true,
          largeThreshold: 100,
          lineStyle: {
            normal: {
              color: "#9c5",
              type: "solid",
              opacity: 1,
              width: 1.0,
              curveness: 0.2
            }
          },
          blendMode: "lighter"
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: data.markPoint.from,
          symbolSize: 5,
          symbol: "circle",
          symbolRotate: 0,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#97D651"
            }
          }
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: data.markPoint.to,
          symbolSize: 5,
          symbol: "arrow",
          symbolRotate: 0,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#97D651"
            }
          }
        }
      ]
    };

    return option;
  };

  resizeChart() {
    if (this.mapChart != null && this.mapChart !== undefined) {
      this.mapChart.resize();
    }
  }

  render() {
    return (
      <div className="echart-wrapper">
        <div
          className="echart-map"
          ref={elem => {
            this.container = elem;
          }}
        />
      </div>
    );
  }
}

export default EChartMap;
