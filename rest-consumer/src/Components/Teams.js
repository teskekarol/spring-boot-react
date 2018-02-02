import React, {Component} from 'react';
import TeamForm from './TeamForm.js'
import './Teams.css'

class Teams extends Component {
    constructor(props){
        super(props)
        this.state = { 
             teams: []
        }
        
        this.echostate = this.echostate.bind(this)
    }

    

    componentWillReceiveProps(nextProps){
        console.log("new props" + nextProps)
        this.setState(this.state);
        this.setState({
            teams: nextProps.team
        })
        
        console.log(this.state.teams)
    }

    componentDidMount(){
        this.setState({})
    }

    echostate(){
        console.log(this.state)
      }

    render() {
        return (
          <div className="Teams">
            <p>Teams</p>
            <button onClick={this.echostate}>teams.state</button>
            <table id="teams">
                <tbody>
                        <tr>
                            <th>Team id</th>
                            <th>Team name</th>
                            <th>Footballers</th>
                        </tr>
            {
                 this.state.teams.map((team,key) => 
                        <tr key={key} className={ (key%2) ? "a" : "b" }>
                            <td>{team.id}</td>
                            <td>{team.name}</td>
                            {team.footballers ? <td>{team.footballers.map((a,key) =>
                                 <p key={key}>{a.name}</p>
                            )}</td> : <td></td>}
                            <td><button onClick={()=>this.props.handleDeleteTeam(team.id)}>x</button></td>
                        </tr>
                )
            }
                </tbody>
            </table>

            <TeamForm addTeam={this.props.handleAddNewTeam}/>
          </div>
        )
      }
}

Teams.defaultProps = {
    teams: []
}

export default Teams