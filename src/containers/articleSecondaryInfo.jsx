import React from "react";
import PropTypes from "prop-types";
import { defKpiMain, defRefugeeTable } from "../definitions";
import SecondaryInfoBoxMain from "../components/secondaryInfoBoxMain";
import SecondaryInfoBoxTable from "../components/secondaryInfoBoxTable";
import QlikService from "../qlik/service";
import "./articleSecondaryInfo.css";

class ArticleSecondaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentWillMount() {
    this.createModel();
  }

  async createModel() {
    const { app } = this.props;

    try {
      const kpi = await QlikService.createSessionObject(app, defKpiMain);
      kpi.model.on("changed", () => this.updateInfoBoxMainsKpi());

      const table = await QlikService.createSessionObject(app, defRefugeeTable);
      table.model.on("changed", () => this.updateTable());

      this.setState({
        tableModel: table.model,
        tableLayout: table.layout,
        kpiModel: kpi.model,
        kpiLayout: kpi.layout,
        loaded: true
      });
    } catch (error) {
      // console.log(error);
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

  render() {
    const { kpiLayout, tableLayout, loaded } = this.state;

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
