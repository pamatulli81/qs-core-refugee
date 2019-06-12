import React from "react";
import PropTypes from "prop-types";
import { defKpiMain, defRefugeeTable } from "../definitions";
import store from "../store/store";
import SecondaryInfoBoxMain from "../components/ui/secondaryInfoBoxMain";
import SecondaryInfoBoxTable from "../components/ui/secondaryInfoBoxTable";
import QlikService from "../service/qlik";
import "./articleSecondaryInfo.css";
import { FIELD_ORIGIN_COUNTRY, FIELD_ASYLUM_COUNTRY } from "../constants";

class ArticleSecondaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
    this.unsubscribe = null;
  }

  componentWillMount() {
    this.createModel();
  }

  componentDidMount() {
    this.mounted = true;
    this.unsubscribe = store.subscribe(() => {
      const { tableModel } = this.state;
      const refField = this.getCountryField();
      
      this.setState({
        refField
      })

      if (tableModel !== undefined) {       
        QlikService.applyPatch(
          tableModel,
          "replace",
          "/qHyperCubeDef/qDimensions/0/qDef/qFieldDefs/0",
          refField
        );
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribe();
  }

  getCountryField = () => {
    const checked = store.getState().toggle;
    return checked
        ? `${FIELD_ORIGIN_COUNTRY}`
        : `${FIELD_ASYLUM_COUNTRY}`;
  }

  async createModel() {
    const { app } = this.props;

    try {
      const qlikKpi = await QlikService.createSessionObject(app, defKpiMain);
      qlikKpi.model.on("changed", () => this.updateInfoBoxMainsKpi());

      const refField = this.getCountryField();

      const qlikTable = await QlikService.createSessionObject(
        app,
        defRefugeeTable(refField)
      );
      qlikTable.model.on("changed", () => this.updateTable());

      if (this.mounted) {
        this.setState({
          tableModel: qlikTable.model,
          tableLayout: qlikTable.layout,
          kpiModel: qlikKpi.model,
          kpiLayout: qlikKpi.layout,
          loaded: true,
          refField
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async updateInfoBoxMainsKpi() {
    const { kpiModel } = this.state;
    const kpiLayout = await kpiModel.getLayout();
    if (this.mounted) {
      this.setState({
        kpiLayout
      });
    }
  }

  async updateTable() {
    const { tableModel } = this.state;
    const tableLayout = await tableModel.getLayout();
    if (this.mounted) {
      this.setState({
        tableLayout
      });
    }
  }

  render() {
    const { kpiLayout, tableLayout, loaded, refField } = this.state;
    const { app } = this.props;

    const style = {
      section: {
        transformOrigin: "center 50% 0px",
        visibility: "inherit",
        opacity: 1,
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        height: "100vh",
        filter: "blur(0px)",
        overflowY: "scroll"
      }
    };

    if (!loaded) {
      return null;
    }

    return (
      <article id="secondaryInfo">
        <section className="explore-data in" style={style.section}>
          <SecondaryInfoBoxMain layout={kpiLayout} />
          <SecondaryInfoBoxTable app={app} layout={tableLayout} refField={refField} />
        </section>
      </article>
    );
  }
}

ArticleSecondaryInfo.propTypes = {
  app: PropTypes.object.isRequired
};

export default ArticleSecondaryInfo;
