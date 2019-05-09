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
import ToggleButton from "../components/button/toggleButton";
import Filterbox from "../components/filter/filterbox";
import Filterdropdown from "../components/filter/filterdropdown";
import PrimaryInfoBoxStats from "../components/ui/primaryInfoBoxStats";
import HorizontalLine from "../components/ui/horizontalLine";
import PrimaryInfoBoxNewsSlider from "../components/ui/primaryInfoBoxNewsSlider";
import PrimaryInfoBoxStories from "../components/ui/primaryInfoBoxStories";
import PrimaryInfoBoxAbout from "../components/ui/primaryInfoBoxAbout";
import EChartBar from "../components/chart/eChartBar";
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
      // console.log(error);
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

    const { app, show, onToggleCountry, tgl } = this.props;

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
          </div>
          {show ? (
            <div>
              <PrimaryInfoBoxStats layout={kpiLayout} />
              <HorizontalLine />
              <EChartBar layout={trendLayout} model={trendModel} />
              <HorizontalLine />
              <PrimaryInfoBoxNewsSlider layout={newsFeedLayout} />
              <PrimaryInfoBoxStories layout={newsFeedLayout} />
              <PrimaryInfoBoxAbout />
              <HorizontalLine />
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </div>
      </article>
    );
  }
}

ArticlePrimaryInfo.propTypes = {
  app: PropTypes.object.isRequired,
  show: PropTypes.bool,
  tgl: PropTypes.bool.isRequired,
  onToggleCountry: PropTypes.func.isRequired
};

ArticlePrimaryInfo.defaultProps = {
  show: false
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
