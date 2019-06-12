import React from "react";
import PropTypes from "prop-types";
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
import MenuItem from "@material-ui/core/MenuItem";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import QlikService from "../../service/qlik";
import QlikUtil from "../../service/qlikUtil";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: "4px",
    height: "100%"
  },
  loadingIndicator: {
    color: "white",
    backgroundColor: "white"
  },
  dropdownIndicator: {
    backgroundColor: "white"
  },
  input: {
    display: "flex",
    padding: 0,
    outline: 0,
    border: 0,
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
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16,
    color: "#8bc449"
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
    height: theme.spacing.unit * 9
  },
  option: {
    borderBottom: "1px dotted pink"
  },
  control: {
    borderColor: "orange"
  },
  menu: {
    backgroundColor: "white",
    boxShadow: "1px 2px 6px #888888", // should be changed as material-ui
    position: "absolute",
    left: 0,
    top: `calc(100% + 1px)`,
    width: "100%",
    zIndex: 2
  },
  menuList: {
    overflowY: "auto"
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

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
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
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SelectSingleValue extends React.Component {
  constructor(...args) {
    super(...args);
    const { model, layout, field } = this.props;
    this.setState = { single: null, initial: null, model, layout, field };
  }

  componentDidMount() {
    const { model, layout, defaultValue } = this.props;
    const elemNumber = QlikUtil.getElemNumberFromText(layout, defaultValue);
    // eslint-disable-next-line radix
    QlikService.selectFromList(model, [parseInt(elemNumber)], false);
  }

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

  setInitialValue = (layout, defaultValue) => {
    return {
      value: QlikUtil.getElemNumberFromText(layout, defaultValue),
      label: defaultValue
    };
  };

  handleChange = name => value => {
    const { model, field } = this.props;

    if (value !== null) {
      // eslint-disable-next-line radix
      QlikService.selectFromList(model, [parseInt(value.value)], false);
    } else {
      QlikService.clearField(field);
    }
  };

  render() {
    const {
      classes,
      layout,
      clearable,
      defaultValue,
      placeHolder
    } = this.props;

    const suggestions = this.fillSuggestions(layout);
    const initial = this.setInitialValue(layout, defaultValue);

    const selectStyles = {
      input: base => ({
        ...base,
        color: 'white',
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
            defaultValue={initial}
            onChange={this.handleChange("single")}
            isClearable={clearable}
            placeholder={placeHolder}
          />
        </NoSsr>
      </div>
    );
  }
}

SelectSingleValue.propTypes = {
  classes: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired,
  clearable: PropTypes.bool,
  field: PropTypes.string.isRequired,
  placeHolder: PropTypes.string
};

SelectSingleValue.defaultProps = {
  clearable: false,
  placeHolder: "Select a value from the list"
};

export default withStyles(styles, { withTheme: true })(SelectSingleValue);
