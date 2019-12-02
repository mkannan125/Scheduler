import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./List.js";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addItem, deleteItem, checkItem } from "./todoListActions.js";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles({
  cardAction: {
    justifyContent: "center"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class TodoImpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      selectedDate: null,
      selectedTime: null,
      HERE: false,
      open: false,
      onDay: false,
      onTime: false
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.onDay && this.state.selectedDate == null) {
      this.setState({ open: true });
    } else {
      if (this.state.term != "") {
        let item = {
          id: this.props.items.length,
          label: this.state.term + "  ",
          dateInfoReminder: this.getDateAndTime(),
          checked: false
        };
        this.props.dispatch(addItem(item));
      }
    }
  };

  getDateAndTime = () => {
    let msg = "";
    this.state.HERE = true;
    if (this.state.selectedDate != null) {
      let shortened =
        this.state.selectedDate.toString().split(" ")[0] +
        " " +
        this.state.selectedDate.toString().split(" ")[1] +
        " " +
        this.state.selectedDate.toString().split(" ")[2];
      msg += " ->  complete by (" + shortened + ")";
    }
    if (this.state.selectedTime != null) {
      let shortened = this.state.selectedTime.toString().split(" ")[4];
      msg += " and by (" + shortened + ")";
    }
    return msg;
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  onCheck = id => event => {
    this.props.dispatch(checkItem(id));
  };

  handleOnDay = event => {
    console.log(event);
    let { onDay } = this.state;
    onDay = !onDay;
    this.setState({ onDay });
  };

  handleOnTime = event => {
    let { onTime } = this.state;
    onTime = !onTime;
    let onDay = onTime;
    this.setState({ onTime, onDay });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleTimeChange = date => {
    this.setState({ selectedTime: date });
  };

  renderCompact = () => {
    return (
      <>
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Todo List
              </Typography>
              <List items={this.props.items} onCheck={this.onCheck} />
            </CardContent>
            <CardActions className="cardAction">
              <Link to="/todo" className="link">
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      </>
    );
  };

  renderFull = () => {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Reminders </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <div className="App">
            <List items={this.props.items} onCheck={this.onCheck} />
            <form className="App" onSubmit={this.onSubmit}>
              <TextField
                id="task-input"
                label="Enter Reminder"
                value={this.state.term}
                onChange={this.onChange}
                margin="normal"
                className="input"
              />
              <Button onClick={this.onSubmit} color="primary">
                SUBMIT
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Please enter a valid Date."}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Remove the date option if you do not want the Date option.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.onDay}
                  onChange={this.handleOnDay}
                  value={this.state.onDay}
                />
              }
              label="Remind me on a Day"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.onTime}
                  onChange={this.handleOnTime}
                  value={this.state.onTime}
                />
              }
              label="Remind me at a Time"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {this.state.onDay ? (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              ) : (
                <></>
              )}
              {this.state.onTime ? (
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={this.state.selectedTime}
                  onChange={this.handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              ) : (
                <></>
              )}
            </MuiPickersUtilsProvider>

            {/* <input value={this.state.term} onChange={this.onChange} /> */}
            {/* //<button>Submit</button> */}
          </div>
        </Container>
      </>
    );
  };

  render() {
    if (this.props.compact) {
      //let classes = useStyles();
      return this.renderCompact();
    }
    return this.renderFull();
  }
}
const Todos = connect(store => {
  return {
    items: store.items
  };
})(TodoImpl);
export default Todos;
