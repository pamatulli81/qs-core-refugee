import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import { withStyles } from "@material-ui/core";
import EChartLine from "../chart/eChartLine";
import EChartSankey from "../chart/eChartSankey";
import EChartPie from "../chart/eChartPie";
import IconLineChart from "../icon/iconLineChart";
import IconSankeyChart from "../icon/iconSankeyChart";
import IconPieChart from "../icon/iconPieChart";
import {
  LABEL_BUTTON_CLOSE,
  TOOLTIP_ICON_LINE,
  TOOLTIP_ICON_SANKEY,
  TOOLTIP_ICON_PIE
} from "../../constants";
import "./chartDialog.css";

const styles = {
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
    padding: "0 !important",
    backgroundColor: "rgba(255, 255, 255, 0.95) !important"
  }
};

const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiIconButton: {
      root: {
        padding: 0
      }
    }
  }
});

class ResponsiveDialog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { open: false };
  }

  componentDidMount() {}

  clickOpenHandler = e => {
    this.setState({ open: true, countryValue: e.currentTarget.value });
  };

  clickCloseHandler = () => {
    this.setState({ open: false });
  };

  getIcon = type => {
    switch (type) {
      case "LineChart":
        return <IconLineChart tooltip={TOOLTIP_ICON_LINE} />;
      case "SankeyChart":
        return <IconSankeyChart tooltip={TOOLTIP_ICON_SANKEY} />;
      default:
        return <IconPieChart tooltip={TOOLTIP_ICON_PIE} />;
    }
  };

  render() {
    const { app, type, value, classes, refField } = this.props;
    const { open, countryValue } = this.state;

    const icon = this.getIcon(type);
    let chart;

    if (countryValue !== undefined) {
      switch (type) {
        case "LineChart":
          chart = (
            <EChartLine app={app} refField={refField} value={countryValue} />
          );
          break;
        case "SankeyChart":
          chart = (
            <EChartSankey app={app} refField={refField} value={countryValue} />
          );
          break;
        default:
          chart = (
            <EChartPie app={app} refField={refField} value={countryValue} />
          );
          break;
      }
    }

    return (
      <MuiThemeProvider theme={buttonTheme}>
        <div>
          <IconButton
            aria-label={value}
            onClick={e => this.clickOpenHandler(e)}
            value={value}
          >
            <SvgIcon>{icon}</SvgIcon>
          </IconButton>
          {open ? (
            <Dialog
              open={open}
              onClose={this.clickCloseHandler}
              aria-labelledby="responsive-dialog-title"
              classes={{ paper: classes.dialogPaper }}
            >
              <DialogTitle id="responsive-dialog-title">{value}</DialogTitle>
              <DialogContent>{chart}</DialogContent>
              <DialogActions>
                <Button onClick={this.clickCloseHandler} color="default">
                  {LABEL_BUTTON_CLOSE}
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

ResponsiveDialog.propTypes = {
  type: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  refField: PropTypes.string.isRequired
};

export default withStyles(styles)(ResponsiveDialog);
