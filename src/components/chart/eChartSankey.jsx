import React from "react";
import PropTypes from "prop-types";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/sankey";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "./eChartSankey.css";
import { defSankeyChart } from "../../definitions";
import QlikService from "../../qlik/service";

class EchartSankey extends React.Component {

  componentDidMount() {
    this.createChart();
    window.addEventListener("resize", this.resizeChart.bind(this));
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
    window.removeEventListener("resize", this.resizeChart.bind(this));
  }

  eCreateNodes = items => {
    
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

  eCreateData = items => {
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


  updateChart = (props) => {
    if (!props) {
      return null;
    }
    const newChartOptions = this.makeChartOptions();
    this.sankeyChart.setOption(newChartOptions);
    return this.sankeyChart;
  };

  makeChartOptions = () => {
    const {sankeyChartLayout} = this.state;
    const data = this.eCreateData(sankeyChartLayout.qHyperCube.qDataPages[0].qMatrix);

    const params = {
      height: '95%',
      width: '80%',
      left: 10,
      top: 5,
      right: 10,
      bottom: 5,
      nodeWidth: 15,
      nodeGap: 5
    }
    
    const option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      toolbox: {
        show : true,
        showTitle: false,
        orient: 'horizontal',
        feature : {
            saveAsImage : {show: true,showTitle: false}
        }
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
          layoutIterations: 35,
          orient: "horizontal",
          itemStyle: {
            normal: {
              borderWidth: 0.5,
              borderColor: "#aaa",
              label: {
                show: true,
                textStyle: {
                  color: "#000",
                  fontFamily: "Arial",
                  fontSize: 8,
                  fontStyle: "italic"
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

  async createChart () {
    const {app, value} = this.props;
    const element = this.container;
    this.sankeyChart = echarts.init(element);
    const qlikObject = await QlikService.createSessionObject(app, defSankeyChart(value));
    this.setState({
      sankeyChartLayout: qlikObject.layout
    })
    this.updateChart(this.props);
  };


  resizeChart() {
    if(this.sankeyChart != null && this.sankeyChart !== undefined){
      this.sankeyChart.resize();
    }
  }

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

EchartSankey.propTypes = {
  app: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default EchartSankey;
