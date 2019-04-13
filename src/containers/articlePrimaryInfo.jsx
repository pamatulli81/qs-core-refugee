import React from "react";
import PropTypes from "prop-types";
import { defYearList, defPersonList, defKpiList, defCountryList } from "../definitions";
import ToggleButton from "../components/toggleButton";
import Filterbox from "../components/filterbox";
import Filterdropdown from "../components/filterdropdown";
import InfoBoxStats from "../components/primaryInfoBoxStats";
import HorizontalLine from "../components/horizontalLine";
import ClearButton from "../components/buttonClearSelection"
import QlikService from "../qlik/service";
import QlikUtil from "../qlik/util";


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
    
    const { app, initialYear } = this.props;

    try {
   
      const year = await QlikService.createSessionObject(app, defYearList);
      const selectedYearElemNumber = QlikUtil.getElemNumberFromText(year.layout, initialYear);

      await QlikService.selectFromList(year.model, selectedYearElemNumber, false);
      year.model.on("changed", () => this.updateFilterboxYear());    

      const person = await QlikService.createSessionObject(app, defPersonList);
      const country = await QlikService.createSessionObject(app, defCountryList);
    
      const kpi = await QlikService.createSessionObject(app, defKpiList);
      kpi.model.on("changed", () => this.updateInfoBoxStatsKpi());
      
      this.setState({
        yearLayout: year.layout,
        yearModel: year.model,
        personLayout: person.layout,
        personModel: person.model,
        countryLayout: country.layout,
        countryModel: country.model,
        kpiModel: kpi.model,
        kpiInfo: {
          nbrOfPerson: kpi.layout.refugeeExpression[0],
          nbrOfCountry: kpi.layout.refugeeExpression[1],
          nbrOfAsylumCountry: kpi.layout.refugeeExpression[2]
        },
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
          <ClearButton app={app} title="Clear All" clearAllCallback={r => this.clearAll(r)} />
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
