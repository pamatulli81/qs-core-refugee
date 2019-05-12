import React from 'react';
import './eChartSankey.css';
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/sankey";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

class eChartSankey extends React.Component {

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
    this.sankeyChart.dispose();
  } 

  eCreateNodes = (items) => {
    const result = [];
    const check = [];
  
    items.forEach(item => {
      if (check.indexOf(item[0].qText) === -1) {
        result.push({ name: item[0].qText, depth: 0 });
        check.push(item[0].qText);
      }
  
      if (check.indexOf(item[1].qText) === -1) {
        result.push({ name: item[1].qText, depth: 1 });
        check.push(item[1].qText);
      }
    });
  
    return result;
  }

  eCreateData = (items) => {
    const obj = {};
    const result = [];
  
    items.forEach(item => {
      if (item[0].qText !== item[1].qText) {
        result.push({
          source: item[0].qText,
          target: item[1].qText,
          value: item[2].qNum
        });
      }
    });
  
    obj.links = result;
    obj.nodes = this.eCreateNodes(items);
  
    return obj;
  }

  createChart = () => {
    const element = this.container;
    this.sankeyChart = echarts.init(element);
    this.updateChart(this.props);
  };

  updateChart = (props) => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions(props);
    this.sankeyChart.setOption(newChartOptions);
    return this.sankeyChart;
  }

  makeChartOptions = (props) => {
    const { layout } = props;
    const data = this.eCreateData(layout.qHyperCube.qDataPages[0].qMatrix);
    
    const params = {
      height: '90%',
      width: '80%',
      left: 10,
      top: 10,
      right: 10,
      bottom: 10,
      nodeWidth: 30,
      nodeGap: 2
    }

    const option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      series: [
        {
          type: "sankey",
          data: data.nodes,
          links: data.links,
          focusNodeAdjacency: false,
          draggable: false,
          left: params.left,
          top: params.top,
          right: params.right,
          bottom: params.bottom,
          width: params.width,
          height: params.height,
          nodeWidth: params.nodeWidth,
          nodeGap: params.nodeGap,
          layoutIterations: 32,
          orient: "horizontal",
          itemStyle: {
            normal: {
              borderWidth: 0.5,
              borderColor: "#aaa",
              label: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontFamily: "Arial",
                  fontSize: 12,
                  fontStyle: "italic",
                  fontWeight: "bolder"
                }
              }
            }
          },
          lineStyle: {
            normal: {
              color: "source",
              curveness: 0.5
            }
          }
        }
      ]
    };

    return option;

  };

  render() {
    return (
      <div
        className="echart-sankey"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }

}

export default eChartSankey;
