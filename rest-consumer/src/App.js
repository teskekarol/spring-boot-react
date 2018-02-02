import React, { Component } from 'react';
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
    this.handleDeleteFootballer = this.handleDeleteFootballer.bind(this)
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

  handleDeleteFootballer(id){
    console.log("deleting in app" + id)
    fetch("http://localhost:8080/api/footballers/"+id+"/", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(res => {
          console.log(id + this.state.footballers)
          let helper = this.state.footballers;
          let j = 0
          for(let t of this.state.teams){
            let i = 0
            for(let p of t.footballers){
              // eslint-disable-next-line
              if(p.id == id){
                let footballers = t.footballers.splice(i,1)
                footballers.pop();
                this.state.teams.splice(j,1)
                this.setState(prevState => ({
                  teams: [...prevState.teams, t]
                }))
              }
              i++
            }
            j++
          }

          let removed = helper.filter(function(el){
              return el.id !== id;
          })
          console.log(removed)
          this.setState({footballers : removed})
        })

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
        console.log(newTeamId)
        // eslint-disable-next-line
        let toCut = this.state.teams.findIndex(e => e.id == newTeamId)
        console.log(toCut)
        console.log(this.state.teams.map(e=>e.name))
        let foundTeam = this.state.teams.splice(toCut,1)
        let oldTeamPls = foundTeam.pop();
        oldTeamPls.footballers.push({id: newId, name: newName, age: newAge, team: {id: newTeamId}})
        console.log(oldTeamPls)
        this.setState(prevState => ({
          teams: [...prevState.teams, oldTeamPls]
        }))
    });
  }

  render() {
    return (
      <div className="App">
        <Footballers att={{footballers: this.state.footballers, teams: this.state.teams}} addFootballer={this.addFootballer} handleDeleteFootballer={this.handleDeleteFootballer}/>
        <Teams team={this.state.teams} handleAddNewTeam={this.handleAddNewTeam} handleDeleteTeam={this.handleDeleteTeam}/>
      </div>
    );
  }
}

export default App;
