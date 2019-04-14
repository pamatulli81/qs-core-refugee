import React from "react";
import PropTypes from "prop-types";
import { defYearList, defPersonList, defKpiStats, defNewsFeed } from "../definitions";
import ToggleButton from "../components/toggleButton";
// import Filterbox from "../components/filterbox";
import Filterdropdown from "../components/filterdropdown";
import InfoBoxStats from "../components/primaryInfoBoxStats";
import HorizontalLine from "../components/horizontalLine";
// import ClearButton from "../components/buttonClearSelection"
import PrimaryInfoBoxNewsSlider from "../components/primaryInfoBoxNewsSlider";
import PrimaryInfoBoxStories from "../components/primaryInfoBoxStories";
import PrimaryInfoBoxAbout from "../components/primaryInfoBoxAbout";
import QlikService from "../qlik/service";
import "./articlePrimaryInfo.css";


class ArticlePrimaryInfo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false};
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
   
      const year = await QlikService.createSessionObject(app, defYearList);
      year.model.on("changed", () => this.updateFilterboxYear());    

      const person = await QlikService.createSessionObject(app, defPersonList);
      // const country = await QlikService.createSessionObject(app, defCountryList);

      const newsFeed = await QlikService.createSessionObject(app, defNewsFeed);
      newsFeed.model.on("changed", () => this.updateNewsFeed());
    
      const kpi = await QlikService.createSessionObject(app, defKpiStats);
      kpi.model.on("changed", () => this.updateInfoBoxStatsKpi());
      
      this.setState({
        yearLayout: year.layout,
        yearModel: year.model,
        personLayout: person.layout,
        personModel: person.model,
        // countryLayout: country.layout,
        // countryModel: country.model,
        kpiLayout: kpi.layout,
        kpiModel: kpi.model,
        newsFeedModel: newsFeed.model,
        newsFeedLayout: newsFeed.layout,
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

  render() {
    const {
      kpiLayout,
      personModel,
      personLayout,
      yearModel,
      yearLayout,
      // countryModel,
      // countryLayout,
      newsFeedLayout,
      loaded
    } = this.state;

    // const {app} = this.props

    if (!loaded) {
      return null;
    }

    return (
      <article id="primaryInfo">
        <div className="info-box stats">
          <ToggleButton toggleValueCallback={this.toggleButton} toggle />
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
          </div>
          <HorizontalLine />
          <PrimaryInfoBoxNewsSlider layout={newsFeedLayout} />
          <PrimaryInfoBoxStories layout={newsFeedLayout} />
          <PrimaryInfoBoxAbout />
          
          {/* <HorizontalLine />
          <Filterbox
            model={countryModel}
            layout={countryLayout}
            name="Country"
            selectedValueCallback={countryText => this.selectCountry(countryText)}
            alwaysOneSelectedValue={false}
            app={app}
            field="[Origin Country]"
          />
          <ClearButton app={app} title="Clear All" clearAllCallback={r => this.clearAll(r)} /> */}
        </div>
      </article>
    );
  }
}

ArticlePrimaryInfo.propTypes = {
  app: PropTypes.object.isRequired
};

export default ArticlePrimaryInfo;
