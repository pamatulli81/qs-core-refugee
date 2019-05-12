import React, { Component } from "react";
import enigma from "enigma.js";
import ArticlePrimaryInfo from "./articlePrimaryInfo";
import ArticleSecondaryInfo from "./articleSecondaryInfo";
import SideBar from "../components/ui/sideBar";
import enigmaConfig from "../enigma-config";
import Map from "../components/ui/map";
import "./app.css";
import "./fonts.css";
import {APP_NAME, ERROR_ENGINE, ERROR_UI_MESSAGE, INITIAL_YEAR, INITIAL_TOGGLE_ORIGIN} from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
      error: null,
      show: true
    };
    this.getApp();
  }

  async getApp() {
    const session = enigma.create(enigmaConfig);
    try {
      const global = await session.open();
      
      const app =
        process.env.NODE_ENV === "production"
          ? await global.getActiveDoc()
          : await global.openDoc(`${APP_NAME}`);

      this.setState({
        app
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  showMap = map => {
    this.setState({
      show: map
    });
  };

  render() {
    const { error, app, show } = this.state;
    
    let articleSecondaryInfo;

    if (error) {
      const msg =
        error instanceof Event
          ? `${ERROR_ENGINE}`
          : error.message;
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

    if (show){
      articleSecondaryInfo = <ArticleSecondaryInfo app={app} />;
    }

    return (
      <main id="map-page">
        <Map />
        <div className="info-grid">
          <div className="slide-in">
            <ArticlePrimaryInfo app={app} show={show} defaultYear={INITIAL_YEAR} defaultToggleOrigin={INITIAL_TOGGLE_ORIGIN} />;
            {articleSecondaryInfo}
            <SideBar showMapCallback={map => this.showMap(map)} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
