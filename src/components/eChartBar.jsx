import React from 'react';
import PropTypes from 'prop-types';
import './eChartBar.css';

import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/sankey";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

class eChartBar extends React.Component {

  static eCreateData(items) {
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
    }
  
  }

  constructor(props) {
    super(props);
    this.state = {
      layout: props.layout
    };
  }

  componentDidMount() {
    this.renderEChartMap();
  }

  renderEChartMap() {
    const { layout } = this.state;
    const element = this.container;

    const data = eChartBar.eCreateData(layout.qHyperCube.qDataPages[0]);

    const myChart = echarts.init(element);

    const option = {
      grid: {
          left: 5,        
          bottom:0,
          top:40,
          height:200,
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
            let res = `Year : ${  params[0].name}`;
            for (let i = 0, l = params.length; i < l; i++) {
                res +=
                    `${"<br/>" +
                    "# of Person" +
                    " : "}${ 
                    parseInt(params[i].value, 10).toLocaleString()}`;
            }
            setTimeout(() => {
                callback(ticket, res);
            }, 200);
            return "...loading";
          } 
      },
      xAxis: {
          type: "category",
          data: data.dims,
          axisLabel: {
              textStyle: {
                  color: "#FFF"
              }
          },
      },
      yAxis: {
          type: "value",
          data: data.values,
          show: true,
          axisLabel: {
              textStyle: {
                  color: "#FFF",
                  fontsize: 4,
              }
          },
          
      },
      series: [{
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
      }]
  };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    } else {
      // eslint-disable-next-line no-console
      console.log('eChartBar options invalid');
    }

  }

  render() {
    return (
      <div
        className="echart-bar"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }

}
eChartBar.propTypes = {
  layout: PropTypes.object.isRequired
};
export default eChartBar;
