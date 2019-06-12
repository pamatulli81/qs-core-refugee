import React, { Component } from "react";
import enigma from "enigma.js";
import ArticlePrimaryInfo from "./articlePrimaryInfo";
import ArticleSecondaryInfo from "./articleSecondaryInfo";
import SideBar from "../components/ui/sideBar";
import enigmaConfig from "../enigma-config";
import Map from "../components/ui/map";
import EChartMap from "../components/chart/eChartMap";
import QlikService from "../service/qlik";
import { defMapChart } from "../definitions";
import "./app.css";
import "./fonts.css";
import {
  ERROR_ENGINE,
  ERROR_UI_MESSAGE,
  INITIAL_YEAR,
  INITIAL_TOGGLE_ORIGIN
} from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
      error: null,
      show: true
    };
  }

  componentDidMount() {
    this.initApp();
  }

  showMap = map => {
    this.setState({
      show: map
    });
  };

  async initApp() {
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
      mapModel,
      mapLayout
    });
  }

  render() {
    const { error, app, show, mapModel, mapLayout } = this.state;
    let articleSecondaryInfo;

    if (error) {
      const msg = error instanceof Event ? `${ERROR_ENGINE}` : error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">{ERROR_UI_MESSAGE}</span>
          <span>{msg}</span>
        </div>
      );
    }

    if (!app) {
      return null;
    }

    if (show) {
      articleSecondaryInfo = <ArticleSecondaryInfo app={app} />;
    }

    const mapView = show ? <Map /> : <EChartMap model={mapModel} layout={mapLayout} />;

    return (
      <main id="map-page">
        {mapView}
        <div className="info-grid">
          <div className="slide-in">
            <ArticlePrimaryInfo
              app={app}
              show={show}
              defaultYear={INITIAL_YEAR}
              defaultToggleOrigin={INITIAL_TOGGLE_ORIGIN}
            />
            ;{articleSecondaryInfo}
            <SideBar showMapCallback={map => this.showMap(map)} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
