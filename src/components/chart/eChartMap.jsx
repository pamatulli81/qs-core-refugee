import React from "react";
import "./eChartMap.css";
import * as echarts from "echarts";
import "echarts/lib/chart/lines";
import "echarts-gl";
import "echarts-stat";
import "echarts/extension/dataTool";
import "echarts/map/js/world";
import { ListItemText } from "@material-ui/core";

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
      refCountries: [],
      routes: [],
      values: [],
      markPoint: {
        from: [],
        to: [],
      },
    };

    items.forEach(item => {
      const geomFrom = this.eCleanArray(item[1]);
      const countryFrom = item[0].qText;
      const countryTo = item[2].qText;
      const geomTo = this.eCleanArray(item[3]);
      const value = item[4].qNum;
      

      if(obj.refCountries.indexOf(item[0].qText) === -1) {
        obj.refCountries.push(item[0].qText);
      }

      obj.routes.push([geomFrom, geomTo, countryFrom, countryTo, value,]);
      obj.markPoint.from.push(geomFrom);
      obj.markPoint.to.push(geomTo);
      obj.values.push(value);
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
    console.log(data);
  
    const option = {
      title: {
        text: "",
        left: "center",
        textStyle: {
          color: "#eee"
        }
      },
      tooltip : {
        trigger: 'item',
        // eslint-disable-next-line object-shorthand
        formatter : function (params) {
            if (params.seriesId !== 'route')
              return;
            console.log(params);
            return `From: <b>${params.data[2]}</b><br/>
                    To: <b>${params.data[3]}</b><br/>
                    # <b>${params.data[4].toLocaleString()}</b><br/>`;
        }
    },
      geo: {
        map: "world",
        left: 0,
        right: 0,
        silent: false,
        roam: true,
        data: [],
        itemStyle: {
          normal: {
            borderColor: "#ccc",
            color: "rgba(50, 62, 83, 0.4)"
          },
          emphasis:{label:{show:true}}
        }
      },
      series: [
        {
          id: "route",
          type: "lines",
          coordinateSystem: "geo",
          data: data.routes,
          smooth:true,
          effect : {
              show: data.refCountries.length === 1,
              scaleSize: 100,
              period:5,
              color: '#fff',
              shadowBlur: 10,
              opacity: 1,
          },
          itemStyle : {
              normal: {
                  borderWidth:1,
                  lineStyle: {
                      type: 'solid',
                      shadowBlur: 100,
                      color: "#9c5",
                      opacity: 1,
                      width: 1.5,
                      curveness: 0.3
                  }
              }
          },
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
          id: "target",
          type: "scatter",
          coordinateSystem: "geo",
          data: data.markPoint.to,
          symbol:'emptyCircle',
          symbolSize: 5,
          effect : {
              show: true,
              shadowBlur : 0
          },
          itemStyle:{
              normal:{
                  label:{show:false},
                  color: "#97D651"
              },
              emphasis: {
                  label:{position:'top'}
              }
          },
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
