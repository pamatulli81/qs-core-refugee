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
import EChartLine from "./eChartLine";
import "./chartDialog.css";

const styles = {
  dialogPaper: {
    minHeight: "60vh",
    maxHeight: "60vh",
    minWidth: "80vw",
    maxWidth: "80vw",
    padding: "0 !important",
    backgroundColor: "rgba(255, 255, 255, 0.95) !important"
  }
};

const buttonTheme = createMuiTheme({
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

  getIcon = iconType => {
    switch (iconType) {
      case "LineChart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <title>Line Chart</title>

            <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
            <path d="M13.5 13.48l-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z" />
          </svg>
        );
      case "ScatterChart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <title>Scatter Chart</title>
            <path fill="white" opacity=".6" d="M0 0h24v24H0V0z" />
            <circle opacity=".3" cx="11" cy="6" r="2" />
            <circle opacity=".3" cx="16.6" cy="17.6" r="2" />
            <circle opacity=".3" cx="7" cy="14" r="2" />
            <path d="M7 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-10c0-2.21-1.79-4-4-4S7 3.79 7 6s1.79 4 4 4 4-1.79 4-4zm-4 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.6 5.6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        );

      default:
        return "";
    }
  };

  render() {
    const { app, iconType, value, classes } = this.props;
    const { open, countryField, countryValue } = this.state;

    const icon = this.getIcon(iconType);
    let lineChart;

    if (countryValue !== undefined) {
      lineChart = (
        <EChartLine app={app} field={countryField} value={countryValue} />
      );
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
          <Dialog
            open={open}
            onClose={this.clickCloseHandler}
            aria-labelledby="responsive-dialog-title"
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogTitle id="responsive-dialog-title">{value}</DialogTitle>
            <DialogContent>{lineChart}</DialogContent>
            <DialogActions>
              <Button onClick={this.clickCloseHandler} color="default">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

ResponsiveDialog.propTypes = {
  iconType: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResponsiveDialog);
