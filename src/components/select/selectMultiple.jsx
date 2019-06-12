/* eslint-disable react/prop-types, react/jsx-handler-names */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import QlikService from "../../service/qlik";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: "4px",
    height: "100%"
  },
  input: {
    display: "flex",
    padding: 0,
    color: "white",
    background: "rgb(160,161,163,0.15)"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    fontSize: 12
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
    fontSize: 10
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },

  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
    color: "white"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiInput: {
        underline: {
          "&&&&:hover:before": {
            borderBottom: "1px solid #8bc449"
          },
          "&&&&:hover:after": {
            borderBottom: "1px solid #8bc449"
          },
          "&&&&:before": {
            borderBottom: "none"
          },
          "&&&&:after": {
            border: "none"
          }
        }
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps
          }
        }}
        {...props.selectProps.textFieldProps}
      />
    </MuiThemeProvider>
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer
};

class SelectMultipleValue extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { multi: null };
  }

  handleChange = name => value => {
    const { model, field } = this.props;
    if (value !== null) {
      // eslint-disable-next-line radix
      const elemNumbers = value.map(elem => parseInt(elem.value));
      QlikService.selectFromList(model, elemNumbers, false);
    } else {
      QlikService.clearField(field);
    }
    this.setState({
      [name]: value
    });
  };

  fillSuggestions = layout => {
    const suggestions = [];
    layout.qListObject.qDataPages[0].qMatrix.map((dim, i) => {
      const suggestion = {};
      suggestion.value = dim[0].qElemNumber;
      suggestion.label = dim[0].qText;
      suggestions.push(suggestion);
    });

    return suggestions;
  };

  render() {
    const { classes, layout, placeHolder } = this.props;
    const { multi } = this.state;

    const suggestions = this.fillSuggestions(layout);

    const selectStyles = {
      input: base => ({
        ...base,
        color: "white",
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            value={multi}
            onChange={this.handleChange("multi")}
            placeholder={placeHolder}
            isMulti
          />
        </NoSsr>
      </div>
    );
  }
}

SelectMultipleValue.propTypes = {
  classes: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  placeHolder: PropTypes.string
};

SelectMultipleValue.defaultProps = {
  placeHolder: "Select values from the list"
};

export default withStyles(styles, { withTheme: true })(SelectMultipleValue);
