import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./Todos.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ClassRoutes from "./ClassRoutes.js";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h2>Scheduler</h2>
            <Switch>
              <Route path="/todo">
                <div className="col-md-4">
                  <Todos />
                </div>
              </Route>
              <Route path="/classroutes">
                <div className="col-md-4">
                  <ClassRoutes />
                </div>
              </Route>
              <Route path="/">
                <div className="col-md-4">
                  <Todos compact={true}></Todos>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
