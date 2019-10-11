import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      term: '',
      items: []
    };
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(this.state.term != ""){
      this.setState({
        term: '',
        items: [...this.state.items, this.state.term]
      });
    }
  }

  onCheck = (event) => {
    
  }

  render() {
    return (
      <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Reminders
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
      <div className="App">
        <List items={this.state.items}/>
        <form className="App" onSubmit={this.onSubmit}>
        <TextField
        id="task-input"
        label="Enter Reminder"
        value={this.state.term}
        onChange={this.onChange}
        margin="normal"
        className="input"
      />
          {/* <input value={this.state.term} onChange={this.onChange} /> */}
          {/* //<button>Submit</button> */}
        </form>
      </div>
      </Container>
      </>
    );
  }
}

