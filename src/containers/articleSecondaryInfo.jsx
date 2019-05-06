/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import { defKpiMain, defRefugeeTable, defMapChart, defSankeyChart } from "../definitions"; // defSankeyChart
import SecondaryInfoBoxMain from "../components/secondaryInfoBoxMain";
import SecondaryInfoBoxTable from "../components/secondaryInfoBoxTable";
import EChartMap from '../components/eChartMap';
import EChartSankey from '../components/eChartSankey';
import QlikService from "../qlik/service";
import "./articleSecondaryInfo.css";

class ArticleSecondaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.createModel();
  }

  async createModel() {
    const { app } = this.props;

    try {
      const kpi = await QlikService.createSessionObject(app, defKpiMain);
      kpi.model.on("changed", () => this.updateInfoBoxMainsKpi());

      const table = await QlikService.createSessionObject(app, defRefugeeTable);
      table.model.on("changed", () => this.updateTable());

      // const mapObj = await QlikService.createSessionObject(app, defMapChart);

      const eChartMap = await QlikService.createSessionObject(app, defMapChart);
      eChartMap.model.on("changed", () => this.updateMap());

      const eChartSankey = await QlikService.createSessionObject(app, defSankeyChart);
      eChartSankey.model.on("changed", () => this.updateSankey());
      

      this.setState({
        tableModel: table.model,
        tableLayout: table.layout,
        kpiModel: kpi.model,
        kpiLayout: kpi.layout,
        mapModel: eChartMap.model,
        mapLayout: eChartMap.layout,
        sankeyModel: eChartSankey.model,
        sankeyLayout: eChartSankey.layout,
        loaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  async updateInfoBoxMainsKpi() {
    const { kpiModel } = this.state;
    const kpiLayout = await kpiModel.getLayout();
    this.setState({
      kpiLayout
    });
  }

  async updateTable() {
    const { tableModel } = this.state;
    const tableLayout = await tableModel.getLayout();
    this.setState({
      tableLayout
    });
  }

  async updateMap() {
    const { mapModel } = this.state;
    const mapLayout = await mapModel.getLayout();
    this.setState({
      mapLayout
    });
  }

  async updateSankey() {
    const { sankeyModel } = this.state;
    const sankeyLayout = await sankeyModel.getLayout();
    this.setState({
      sankeyLayout
    });
  }

  render() {
    const { kpiLayout, tableLayout, mapLayout, sankeyLayout, loaded } = this.state;
    
    const style = {
      section: {
        transformOrigin: "center 50% 0px",
        visibility: "inherit",
        opacity: 1,
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        height: "100vh",
        filter: "blur(0px)"
      }
    };

    if (!loaded) {
      return null;
    }

    return (
      <article id="secondaryInfo">
        <section className="explore-data in" style={style.section}>
          <EChartSankey layout={sankeyLayout} />
          <EChartMap layout={mapLayout} />
          <SecondaryInfoBoxMain layout={kpiLayout} />
          <SecondaryInfoBoxTable layout={tableLayout} />
        </section>
      </article>
    );
  }
}

ArticleSecondaryInfo.propTypes = {
  app: PropTypes.object.isRequired
};

export default ArticleSecondaryInfo;
