import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  defYearList,
  defPersonList,
  defKpiStats,
  defNewsFeed,
  defBarChart,
  defAsylumCountryList,
  defOriginCountryList
} from "../definitions";
import ToggleButton from "../components/button/toggleButton";
import PrimaryInfoBoxStats from "../components/ui/primaryInfoBoxStats";
import HorizontalLine from "../components/ui/horizontalLine";
import PrimaryInfoBoxNewsSlider from "../components/ui/primaryInfoBoxNewsSlider";
import PrimaryInfoBoxStories from "../components/ui/primaryInfoBoxStories";
import PrimaryInfoBoxAbout from "../components/ui/primaryInfoBoxAbout";
import EChartBar from "../components/chart/eChartBar";
import SelectSingleValue from "../components/select/selectSingle";
import SelectMultipleValue from "../components/select/selectMultiple";
import QlikService from "../service/qlik";
import "./articlePrimaryInfo.css";
import {
  ACTION_TOGGLE,
  FIELD_YEAR,
  FIELD_ORIGIN_COUNTRY,
  FIELD_ASYLUM_COUNTRY,
  FIELD_PERSON_TYPE,
  MSG_PERSON_LIST,
  MSG_ORIGIN_COUNTRY_LIST,
  MSG_ASYLUM_COUNTRY_LIST
} from "../constants";

class ArticlePrimaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.mounted = true;
    this.createModel();
  }

  componentWillUnmount() {
    this.mounted = false;
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

      const qlikOriginCountry = await QlikService.createSessionObject(
        app,
        defOriginCountryList
      );

      const qlikAsylumCountry = await QlikService.createSessionObject(
        app,
        defAsylumCountryList
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

      if (this.mounted) {
        this.setState({
          yearLayout: qlikYear.layout,
          yearModel: qlikYear.model,
          personLayout: qlikPerson.layout,
          personModel: qlikPerson.model,
          trendModel: qlikTrend.model,
          trendLayout: qlikTrend.layout,
          countryOriginLayout: qlikOriginCountry.layout,
          countryOriginModel: qlikOriginCountry.model,
          countryAsylumLayout: qlikAsylumCountry.layout,
          countryAsylumModel: qlikAsylumCountry.model,
          kpiLayout: qlikKpi.layout,
          kpiModel: qlikKpi.model,
          newsFeedModel: qlikNewsFeed.model,
          newsFeedLayout: qlikNewsFeed.layout,
          loaded: true
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async updateInfoBoxStatsKpi() {
    const { kpiModel } = this.state;
    const kpiLayout = await kpiModel.getLayout();
    if (this.mounted) {
      this.setState({
        kpiLayout
      });
    }
  }

  async updateFilterboxYear() {
    const { yearModel } = this.state;
    const yearLayout = await yearModel.getLayout();
    if (this.mounted) {
      this.setState({
        yearModel,
        yearLayout
      });
    }
  }

  async updateNewsFeed() {
    const { newsFeedModel } = this.state;
    const newsFeedLayout = await newsFeedModel.getLayout();
    if (this.mounted) {
      this.setState({
        newsFeedModel,
        newsFeedLayout
      });
    }
  }

  async updateEbarChart() {
    const { trendModel } = this.state;
    const trendLayout = await trendModel.getLayout();
    if (this.mounted) {
      this.setState({
        trendModel,
        trendLayout
      });
    }
  }

  render() {
    const {
      kpiLayout,
      personModel,
      personLayout,
      yearModel,
      yearLayout,
      trendModel,
      trendLayout,
      countryAsylumModel,
      countryAsylumLayout,
      countryOriginModel,
      countryOriginLayout,
      newsFeedLayout,
      loaded
    } = this.state;

    const {
      show,
      onToggleCountry,
      tglOrigin,
      defaultYear,
      defaultToggleOrigin
    } = this.props;

    if (!loaded) {
      return null;
    }

    const style = {
      border: show ? "0px" : "1px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "10px",
      WebkitBackgroundClip: "padding-box" /* for Safari */,
      backgroundClip: "padding-box" /* for IE9+, Firefox 4+, Opera, Chrome */
    };

    return (
      <article id="primaryInfo" className="primaryInfo_fadeIn">
        <div className="info-box stats" style={style}>
          <ToggleButton
            toggleValueCallback={onToggleCountry}
            toggle={tglOrigin !== undefined ? tglOrigin : defaultToggleOrigin}
          />
          <HorizontalLine />
          <div className="info-box__form">
            <SelectSingleValue
              model={yearModel}
              layout={yearLayout}
              field={FIELD_YEAR}
              defaultValue={defaultYear}
            />
            <SelectMultipleValue
              model={personModel}
              layout={personLayout}
              field={FIELD_PERSON_TYPE}
              placeHolder={MSG_PERSON_LIST}
            />
            <SelectMultipleValue
              model={tglOrigin !== undefined && !tglOrigin ? countryAsylumModel : countryOriginModel}
              layout={tglOrigin !== undefined && !tglOrigin ? countryAsylumLayout : countryOriginLayout}
              field={tglOrigin !== undefined && !tglOrigin ? FIELD_ASYLUM_COUNTRY : FIELD_ORIGIN_COUNTRY}
              placeHolder={tglOrigin !== undefined && !tglOrigin ? MSG_ASYLUM_COUNTRY_LIST : MSG_ORIGIN_COUNTRY_LIST}
            />
            <HorizontalLine />
            <PrimaryInfoBoxStats layout={kpiLayout} toggle={tglOrigin !== undefined ? tglOrigin : defaultToggleOrigin} />
            {show ? <HorizontalLine /> : null}
          </div>
          {show ? (
            <div>
              <EChartBar layout={trendLayout} model={trendModel} />
              <HorizontalLine />
              <PrimaryInfoBoxNewsSlider layout={newsFeedLayout} />
              <PrimaryInfoBoxStories layout={newsFeedLayout} />
              <PrimaryInfoBoxAbout />
            </div>
          ) : null}
        </div>
      </article>
    );
  }
}

ArticlePrimaryInfo.propTypes = {
  app: PropTypes.object.isRequired,
  show: PropTypes.bool,
  tglOrigin: PropTypes.bool.isRequired,
  onToggleCountry: PropTypes.func.isRequired,
  defaultYear: PropTypes.string.isRequired,
  defaultToggleOrigin: PropTypes.bool.isRequired
};

ArticlePrimaryInfo.defaultProps = {
  show: false
};

const mapStateToProps = state => {
  return {
    tglOrigin: state.toggle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleCountry: () => dispatch({ type: `${ACTION_TOGGLE}` })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePrimaryInfo);
