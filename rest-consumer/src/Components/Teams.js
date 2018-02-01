import React, {Component} from 'react';
import TeamForm from './TeamForm.js'
import './Teams.css'

class Teams extends Component {
    constructor(props){
        super(props)
        this.state = { 
             teams: []
        }
    
    }

    componentWillReceiveProps(){
        this.setState({
            teams: this.props.teams
        })
    }

    addTeam(nameTeamToAdd){
        console.log("team to add: " + nameTeamToAdd)
    }

    render() {
        return (
          <div className="Teams">
            <p>Teams</p>
            <table id="teams">
                <tbody>
                        <tr>
                            <th>Team id</th>
                            <th>Team name</th>
                        </tr>
            {
                this.props.teams.map((team,key) => 
                        <tr key={key} className={ (key%2) ? "a" : "b" }>
                            <td>{team.id}</td>
                            <td>{team.name}</td>
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

export default Teams