import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./List.js";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: [],
      selectedDate: null,
      selectedTime: null,
      onDay: false,
      onTime: false
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.term != "") {
      let item = {
        id: this.state.items.length,
        label: this.state.term,
        checked: false
      };
      this.setState({
        term: "",
        onDay: false,
        onTime: false,
        items: [...this.state.items, item]
      });
    }
  };

  onCheck = id => event => {
    let { items } = this.state;
    console.log(items);
    console.log(id);
    items[id].checked = !items[id].checked;
    this.setState({ items });
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

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Reminders </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <div className="App">
            <List items={this.state.items} onCheck={this.onCheck} />
            <form className="App" onSubmit={this.onSubmit}>
              <TextField
                id="task-input"
                label="Enter Reminder"
                value={this.state.term}
                onChange={this.onChange}
                margin="normal"
                className="input"
              />
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
  }
}
