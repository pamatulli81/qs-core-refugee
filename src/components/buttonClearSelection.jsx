/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import "./horizontalLine.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import QlikService from "../qlik/service";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  back: {
      backgroundColor: "#8bc449"
  }
});

function ClearButton(props) {
  const { classes } = props;

  const clearClickHandler = () => {
    const {app, clearAllCallback} = props;
    QlikService.clearAll(app).then((r)=>{
        clearAllCallback(r);
    });    
  };

  const { title } = props;

  // eslint-disable-next-line react/button-has-type
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={e => clearClickHandler(e)}
    >
      {title}
      <DeleteIcon className={classes.rightIcon} />
    </Button>
  );
}

/* PAM: Property Types validation using the Prop Types Plugin */
ClearButton.propTypes = {
  app: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  clearAllCallback: PropTypes.func
};

ClearButton.defaultProps = {
    clearAllCallback: null
}

export default withStyles(styles)(ClearButton);
