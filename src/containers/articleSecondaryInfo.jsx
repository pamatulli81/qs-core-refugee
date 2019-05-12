import React from "react";
import PropTypes from "prop-types";
import { defKpiMain, defRefugeeTable } from "../definitions";
import store from '../store/store';
import SecondaryInfoBoxMain from "../components/ui/secondaryInfoBoxMain";
import SecondaryInfoBoxTable from "../components/ui/secondaryInfoBoxTable";
import QlikService from "../qlik/service";
import "./articleSecondaryInfo.css";
import {FIELD_ORIGIN_COUNTRY, FIELD_ASYLUM_COUNTRY} from "../constants";

class ArticleSecondaryInfo extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
    this.unsubscribe = null;
  }

  componentWillMount() {
    this.createModel();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      
      const { tableModel } = this.state;

      if(tableModel!==undefined){
      
        const checked = store.getState().toggle;
        const dimCountry = checked ? `${FIELD_ORIGIN_COUNTRY}` : `${FIELD_ASYLUM_COUNTRY}`;
      
        QlikService.applyPatches(
          tableModel,
          "replace",
          "/qHyperCubeDef/qDimensions/0/qDef/qFieldDefs/0",
          dimCountry
        );

      }  
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  async createModel() {
    const { app } = this.props;

    try {
      const qlikKpi = await QlikService.createSessionObject(app, defKpiMain);
      qlikKpi.model.on("changed", () => this.updateInfoBoxMainsKpi());

      const field = store.getState().toggle ? `${FIELD_ORIGIN_COUNTRY}` : `${FIELD_ASYLUM_COUNTRY}`;;
      const qlikTable = await QlikService.createSessionObject(app, defRefugeeTable(field));
      qlikTable.model.on("changed", () => this.updateTable());

      this.setState({
        tableModel: qlikTable.model,
        tableLayout: qlikTable.layout,
        kpiModel: qlikKpi.model,
        kpiLayout: qlikKpi.layout,
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
          <SecondaryInfoBoxTable app={app} layout={tableLayout} />
        </section>
      </article>
    );
  }
}

ArticleSecondaryInfo.propTypes = {
  app: PropTypes.object.isRequired
};

export default ArticleSecondaryInfo;
