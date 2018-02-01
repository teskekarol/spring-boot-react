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
      teams: []
    }

    this.echostate = this.echostate.bind(this);
    this.handleAddNewTeam = this.handleAddNewTeam.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    this.addFootballer = this.addFootballer.bind(this);
  }
  
  componentDidMount(){
    fetch('http://localhost:8080/api/footballers/')
      .then(response => {
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
     }).then((response) => response.json())
        .then(res => {
         newId = res.headers.get('teamid')
         this.setState(prevState => ({
          teams: [...prevState.teams, {id: newId, name: newTeamName}]
        }))

     });
  }

  addFootballer(newName, newAge,newTeamId) {
    console.log("app js: " + newName)
    let newId;
    let team = {name: newName, age: newAge, team: {id: newTeamId}}
    console.log(JSON.stringify(team))
    fetch('http://localhost:8080/api/footballers/', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({name: newName, age: newAge, team: {id: newTeamId}})
    }).then((res) => {
        newId = res.headers.get('footballerid')
        this.setState(prevState => ({
          footballers: [...prevState.footballers, {id: newId, name: newName, age: newAge, team: {id: newTeamId}}]
        }))
        this.forceUpdate()
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
        <Footballers att={{footballers: this.state.footballers, teams: this.state.teams}} addFootballer={this.addFootballer}/>

        <Teams att={{team: this.state.teams}} handleAddNewTeam={this.handleAddNewTeam} handleDeleteTeam={this.handleDeleteTeam}/>
      </div>
    );
  }
}

export default App;
