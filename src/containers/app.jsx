import React, { Component } from "react";
import enigma from "enigma.js";
import ArticlePrimaryInfo from "./articlePrimaryInfo";
import ArticleSecondaryInfo from "./articleSecondaryInfo";
import enigmaConfig from "../enigma-config";
import EChartMap from '../components/eChartMap';
import QlikService from "../qlik/service";
import { defMapChart } from "../definitions"; 

import "./app.css";
import "./fonts.css";


const CURRENT_YEAR = "2017";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
      error: null
    };
    this.createModel();
  }

  async createModel() {
    const session = enigma.create(enigmaConfig);
    try {
      const global = await session.open();

      const app =
        process.env.NODE_ENV === "production"
          ? await global.getActiveDoc()
          : await global.openDoc("Refugees.qvf");

      const eChartMap = await QlikService.createSessionObject(app, defMapChart);
      eChartMap.model.on("changed", () => this.updateMap());

      this.setState({
        app,
        initialYear: CURRENT_YEAR,
        mapModel: eChartMap.model,
        mapLayout: eChartMap.layout
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  async updateMap() {
    const { mapModel } = this.state;
    const mapLayout = await mapModel.getLayout();
    this.setState({
      mapLayout
    });
  }

  render() {
    const { error, app, initialYear, mapLayout } = this.state;

    if (error) {
      const msg =
        error instanceof Event
          ? "Failed to establish a connection to an Engine"
          : error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">Oops, something went wrong.</span>
          <span>{msg}</span>
        </div>
      );
    }
    if (!app) {
      return null;
    }

    return (
      <main id="map-page">
       
        <EChartMap layout={mapLayout} />
        <div className="info-grid">
          <div className="slide-in">
            <ArticlePrimaryInfo app={app} />
            <ArticleSecondaryInfo app={app} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
