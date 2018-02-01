import React, { Component } from 'react';
import logo from './logo.svg';
import Footballers from './Components/Footballers'
import Teams from './Components/Teams'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      footballers: [],
      teams: [],
      id: 3
    }

    this.echostate = this.echostate.bind(this);
    this.handleAddNewTeam = this.handleAddNewTeam.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
  }
  
  componentDidMount(){
    fetch('http://localhost:8080/api/footballers/')
      .then(response => {
          console.log("resp fro footbersget in app" + response.status);
          if(response.status >= 400){
              throw new Error("Bad response > 400");
          }
          return response.json();
      })
      .then(data => {
          this.setState({ footballers: data })
          console.log("fetched footb: " + data.map(a => a.name))
        })
        .catch((err) => {
            return console.log(err)
      })

      fetch('http://localhost:8080/api/teams/')
      .then(response => {
          console.log("response from teamget in app " + response.status);
          if(response.status >= 400){
              throw new Error("Bad response > 400");
          }
          return response.json();
      })
      .then(data => {
          console.log("fetched teams: " + data.map(a => a.name))
          this.setState( { teams: data } )
          console.log("stated app teams: " + this.state.teams.map(a => a.name))
        })
      .catch((err) => {
            return console.log(err)
        })

  }

  echostate(){
    console.log(this.state)
  }

  addNewTeam(newId,newName){
    console.log("succes")
  }

  handleDeleteTeam(id){
    console.log("deleting " + id)

    fetch("http://localhost:8080/api/teams/"+id+"/", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => {
        let helper = this.state.teams;
        let removed = helper.filter(el => {
            return el.id !== id;
        })
        console.log(removed)
        this.setState({teams : removed})
      })

  }

  handleAddNewTeam(newTeamName){
    let newId
    fetch('http://localhost:8080/api/teams/', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name: newTeamName})
     }).then(res => {
         newId = res.headers.get('teamid')
         this.setState(prevState => ({
          teams: [...prevState.teams, {id: newId, name: newTeamName}]
        }))

     });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.echostate}>app.state</button>
        <Footballers att={{footballers: this.state.footballers, teams: this.state.teams}}/>
        <Teams teams={this.state.teams} handleAddNewTeam={this.handleAddNewTeam} handleDeleteTeam={this.handleDeleteTeam}/>
      </div>
    );
  }
}

export default App;
