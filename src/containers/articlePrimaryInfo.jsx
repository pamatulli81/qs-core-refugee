/* eslint-disable no-console */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  defYearList,
  defPersonList,
  defKpiStats,
  defNewsFeed,
  defBarChart,
  defCountryList
} from "../definitions";
import ToggleButton from "../components/toggleButton";
import Filterbox from "../components/filterbox";
import Filterdropdown from "../components/filterdropdown";
import InfoBoxStats from "../components/primaryInfoBoxStats";
import HorizontalLine from "../components/horizontalLine";
import PrimaryInfoBoxNewsSlider from "../components/primaryInfoBoxNewsSlider";
import PrimaryInfoBoxStories from "../components/primaryInfoBoxStories";
import PrimaryInfoBoxAbout from "../components/primaryInfoBoxAbout";
import EChartBar from "../components/eChartBar";
import QlikService from "../qlik/service";
import "./articlePrimaryInfo.css";

class ArticlePrimaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false, toggle: false };
  }

  componentDidMount() {
    this.createModel();
  }

  toggleButton = checked => {
    console.log(checked);
  };

  selectedYear = selectedYear => {
    console.log(selectedYear);
  };

  selectCountry = selectedCountry => {
    console.log(selectedCountry);
  };

  selectedPerson = selectedPerson => {
    console.log(selectedPerson);
  };

  clearAll = r => {
    console.log(r);
  };

  async createModel() {
    const { app } = this.props;

    try {
      const qlikYear = await QlikService.createSessionObject(app, defYearList);
      qlikYear.model.on("changed", () => this.updateFilterboxYear());

      const qlikPerson = await QlikService.createSessionObject(
        app,
        defPersonList
      );
      const qlikCountry = await QlikService.createSessionObject(
        app,
        defCountryList
      );

      const qlikNewsFeed = await QlikService.createSessionObject(
        app,
        defNewsFeed
      );
      qlikNewsFeed.model.on("changed", () => this.updateNewsFeed());

      const qlikKpi = await QlikService.createSessionObject(app, defKpiStats);
      qlikKpi.model.on("changed", () => this.updateInfoBoxStatsKpi());

      const qlikTrend = await QlikService.createSessionObject(app, defBarChart);
      qlikTrend.model.on("changed", () => this.updateEbarChart());

      this.setState({
        yearLayout: qlikYear.layout,
        yearModel: qlikYear.model,
        personLayout: qlikPerson.layout,
        personModel: qlikPerson.model,
        trendModel: qlikTrend.model,
        trendLayout: qlikTrend.layout,
        countryLayout: qlikCountry.layout,
        countryModel: qlikCountry.model,
        kpiLayout: qlikKpi.layout,
        kpiModel: qlikKpi.model,
        newsFeedModel: qlikNewsFeed.model,
        newsFeedLayout: qlikNewsFeed.layout,
        loaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateInfoBoxStatsKpi() {
    const { kpiModel } = this.state;
    const kpiLayout = await kpiModel.getLayout();
    this.setState({
      kpiLayout
    });
  }

  async updateFilterboxYear() {
    const { yearModel } = this.state;
    const yearLayout = await yearModel.getLayout();
    this.setState({
      yearModel,
      yearLayout
    });
  }

  async updateNewsFeed() {
    const { newsFeedModel } = this.state;
    const newsFeedLayout = await newsFeedModel.getLayout();
    this.setState({
      newsFeedModel,
      newsFeedLayout
    });
  }

  async updateEbarChart() {
    const { trendModel } = this.state;
    const trendLayout = await trendModel.getLayout();
    this.setState({
      trendModel,
      trendLayout
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    const {
      kpiLayout,
      personModel,
      personLayout,
      yearModel,
      yearLayout,
      trendModel,
      trendLayout,
      countryModel,
      countryLayout,
      newsFeedLayout,
      loaded,
      toggle
    } = this.state;

    const {app, onToggleCountry, tgl} = this.props

    if (!loaded) {
      return null;
    }

    return (
      <article id="primaryInfo">
        <div className="info-box stats">
          <ToggleButton
            toggleValueCallback={onToggleCountry}
            toggle={tgl !== undefined ? tgl : toggle}
          />
          <HorizontalLine />
          <div className="info-box__form">
            <Filterdropdown
              model={yearModel}
              layout={yearLayout}
              selectedValueCallback={yearText => this.selectedYear(yearText)}
            />
            <Filterdropdown
              model={personModel}
              layout={personLayout}
              header="Select a Person"
              selectedValueCallback={personText =>
                this.selectedPerson(personText)
              }
            />
            <HorizontalLine />
            <InfoBoxStats layout={kpiLayout} />
            <EChartBar layout={trendLayout} model={trendModel} />
          </div>
          <HorizontalLine />
          <Filterbox
            model={countryModel}
            layout={countryLayout}
            name="Country"
            selectedValueCallback={countryText =>
              this.selectCountry(countryText)
            }
            alwaysOneSelectedValue={false}
            app={app}
            field="[Asylum Country]"
          />
          <HorizontalLine />
          <PrimaryInfoBoxNewsSlider layout={newsFeedLayout} />
          <PrimaryInfoBoxStories layout={newsFeedLayout} />
          <PrimaryInfoBoxAbout />
          <HorizontalLine />
        </div>
      </article>
    );
  }
}

ArticlePrimaryInfo.propTypes = {
  app: PropTypes.object.isRequired,
  tgl: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    tgl: state.toggle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleCountry: () => dispatch({ type: "TOGGLE" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePrimaryInfo);
