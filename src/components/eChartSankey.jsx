import React from 'react';
import PropTypes from 'prop-types';
import './eChartSankey.css';

import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/sankey";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

class eChartSankey extends React.Component {

  static eCreateNodes(items) {
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
  
    // check = null;
    return result;
  }

  static eCreateData(items) {
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
    obj.nodes = eChartSankey.eCreateNodes(items);
  
    return obj;
  }
  
  constructor(props) {
    super(props);
    this.state = {
      layout: props.layout
    };
  }

  componentDidMount() {
    this.renderEChartSankey();
  }

  renderEChartSankey() {
    const { layout } = this.state;
    const element = this.container;

    const data = eChartSankey.eCreateData(layout.qHyperCube.qDataPages[0].qMatrix);
    const myChart = echarts.init(element);

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

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    } else {
      // eslint-disable-next-line no-console
      console.log('eChartSankey options invalid');
    }

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
eChartSankey.propTypes = {
  layout: PropTypes.object.isRequired
};
export default eChartSankey;
