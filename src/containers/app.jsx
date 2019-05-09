import React, { Component } from "react";
import enigma from "enigma.js";
import ArticlePrimaryInfo from "./articlePrimaryInfo";
import ArticleSecondaryInfo from "./articleSecondaryInfo";
import SideBar from "../components/ui/sideBar";
import enigmaConfig from "../enigma-config";
import Map from "../components/ui/map";
import "./app.css";
import "./fonts.css";

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
      const docs = await global.getDocList();

      const app =
        process.env.NODE_ENV === "production"
          ? await global.getActiveDoc()
          : await global.openDoc("Refugees.qvf");

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
    let articlePrimaryInfo;
    let articleSecondaryInfo;

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

    if (show){
      articleSecondaryInfo = <ArticleSecondaryInfo app={app} />;
    }

    return (
      <main id="map-page">
        <Map />
        <div className="info-grid">
          <div className="slide-in">
            <ArticlePrimaryInfo app={app} show={show} />;
            {articleSecondaryInfo}
            <SideBar showMapCallback={map => this.showMap(map)} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
