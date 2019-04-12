import React from "react";
import PropTypes from "prop-types";
import { defYearList, defPersonList, defKpiList, defCountryList } from "../definitions";
import ToggleButton from "../components/toggleButton";
import Filterbox from "../components/filterbox";
import Filterdropdown from "../components/filterdropdown";
import InfoBoxStats from "../components/primaryInfoBoxStats";
import HorizontalLine from "../components/horizontalLine";
import ClearButton from "../components/buttonClearSelection"


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

  async createModel() {
    const { app, initialYear } = this.props;
    try {
      // create the models
      const yearModel = await app.createSessionObject(defYearList);
      const yearLayout = await yearModel.getLayout();
      const selectedYearElemNumber = yearLayout.qListObject.qDataPages[0].qMatrix.find(
        item => item[0].qText === initialYear
      )[0].qElemNumber;
      await yearModel.selectListObjectValues(
        "/qListObjectDef",
        [selectedYearElemNumber],
        false
      );
      yearModel.on("changed", () => this.updateFilterboxYear());    

      const personModel = await app.createSessionObject(defPersonList);
      const personLayout = await personModel.getLayout();

      const countryModel = await app.createSessionObject(defCountryList);
      const countryLayout = await countryModel.getLayout();

      const kpiModel = await app.createSessionObject(defKpiList);
      kpiModel.on("changed", () => this.updateInfoBoxStatsKpi());
      const kpiLayout = await kpiModel.getLayout();

      this.setState({
        yearLayout,
        yearModel,
        personLayout,
        personModel,
        countryLayout,
        countryModel,
        kpiModel,
        kpiInfo: {
          nbrOfPerson: kpiLayout.refugeeExpression[0],
          nbrOfCountry: kpiLayout.refugeeExpression[1],
          nbrOfAsylumCountry: kpiLayout.refugeeExpression[2]
        },
        loaded: true
      });

      kpiModel.on("changed", () => this.updateInfoBoxStatsKpi());
    } catch (error) {
      // console.log(error);
    }
  }

  async updateInfoBoxStatsKpi() {
    const { kpiModel } = this.state;
    const kpiLayout = await kpiModel.getLayout();
    this.setState({
      kpiInfo: {
        nbrOfPerson: kpiLayout.refugeeExpression[0],
        nbrOfCountry: kpiLayout.refugeeExpression[1],
        nbrOfAsylumCountry: kpiLayout.refugeeExpression[2]
      }
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

  render() {
    const {
      kpiInfo,
      personModel,
      personLayout,
      yearModel,
      yearLayout,
      countryModel,
      countryLayout,
      loaded
    } = this.state;

    const {app} = this.props

    if (!loaded) {
      return null;
    }

    return (
      <article id="primaryInfo">
        <div className="info-box stats">
          <ToggleButton toggleValueCallback={this.toggleButton} toggle />
          <aside className="info-box-label" />
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
            <InfoBoxStats
              nbrOfPerson={kpiInfo.nbrOfPerson}
              nbrOfCountry={kpiInfo.nbrOfCountry}
              nbrOfAsylumCountry={kpiInfo.nbrOfAsylumCountry}
            />
          </div>
          <HorizontalLine />
          <Filterbox
            model={countryModel}
            layout={countryLayout}
            name="Country"
            selectedValueCallback={countryText => this.selectCountry(countryText)}
            alwaysOneSelectedValue={false}
            app={app}
            field="[Origin Country]"
          />
          <ClearButton app={app} title="Clear All" />
        </div>
      </article>
    );
  }
}

ArticlePrimaryInfo.propTypes = {
  app: PropTypes.object.isRequired,
  initialYear: PropTypes.string.isRequired
};

export default ArticlePrimaryInfo;
