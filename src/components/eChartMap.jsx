import React from 'react';
import PropTypes from 'prop-types';
import './eChartMap.css';

import * as echarts from 'echarts';
import 'echarts/lib/chart/lines';
import 'echarts-gl';
import 'echarts-stat';
import 'echarts/extension/dataTool';
import 'echarts/map/js/world';

class EChartMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: props.layout
    };

    this.routes = null;
    this.values = null;
    this.markPoint = null;
    this.obj = {
      routes: null,
      values: null,
      markPoint: null
    };
  }

  componentDidMount() {
    this.renderEChartMap();
  }

  eCleanArray(item) {
    this.data = item;
    this.data = this.data.qText.replace('[','');
    this.data = this.data.replace(']','');
    this.data = this.data.split(',');
    this.data = [parseFloat(this.data[0]), parseFloat(this.data[1])];

    return this.data;
  }

  eCreateData(items) {
    this.routes = [];
    this.values = [];
    this.markPoint = {
        from: [],
        to: []
    };

    items.forEach(item => {
      this.from = this.eCleanArray(item[1]);
      this.to = this.eCleanArray(item[3]);
        
      this.routes.push([this.from, this.to]);
      this.markPoint.from.push(this.from);
      this.markPoint.to.push(this.to);
      this.values.push(item[4].qNum);
    })

    this.obj.routes = this.routes;
    this.obj.values = this.values; 
    this.obj.markPoint = this.markPoint;

    return this.obj;
  }

  renderEChartMap() {
    const { layout } = this.state;
    const element = this.container;
    // console.log(element);

    const data = this.eCreateData(layout.qHyperCube.qDataPages[0].qMatrix);
    const myChart = echarts.init(element);
    const option = {
      title: {
            text: '',
            left: 'center',
            textStyle: {
                color: '#eee'
            }
        },
        backgroundColor: '#000',
        tooltip : {},
        legend: {
            orient: 'vertical',
            left: 'top',
            data:['Origin Country','Asylum Country']
        },
        geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: false,
            roam: true,
            itemStyle: {
                normal: {
                    borderColor: '#008',
                    color: '#005'
                }
            }
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'geo',
            data: data.routes,
            large: true,
            largeThreshold: 100,
            lineStyle: {
                normal: {
                    color: '#97D651',
                    type: 'solid',
                    opacity: 0.5,
                    width: 1.0,
                    curveness: 0.2
                },
            },
            blendMode: 'lighter'
        },{
           type: 'scatter',
           coordinateSystem: 'geo',
           data: data.markPoint.from,
           symbolSize: 5,
           symbol: 'circle',
           symbolRotate: 0,
           label: {
               normal: {
                   formatter: '{b}',
                   position: 'right',
                   show: false
               },
               emphasis: {
                   show: true
               }
           },
           itemStyle: {
               normal: {
                    color: '#97D651'
               }
           }
        },
        {
           type: 'scatter',
           coordinateSystem: 'geo',
           data: data.markPoint.to,
           symbolSize: 5,
           symbol: 'arrow',
           symbolRotate: 0,
           label: {
               normal: {
                   formatter: '{b}',
                   position: 'right',
                   show: false
               },
               emphasis: {
                   show: true
               }
           },
           itemStyle: {
               normal: {
                    color: '#97D651'
               }
           }
        }]
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    } else {
      // eslint-disable-next-line no-console
      console.log('eChartMap options invalid');
    }

  }

  render() {
    return (
      <div
        className="echart-map"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

EChartMap.propTypes = {
  layout: PropTypes.object.isRequired
};

export default EChartMap;
