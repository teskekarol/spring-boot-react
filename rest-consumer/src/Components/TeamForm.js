import React, { Component } from 'react';

class TeamForm extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name : ''
        }

        this.handleAddTeam = this.handleAddTeam.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleAddTeam(event) {
        event.preventDefault();
        this.props.addTeam(this.state.name)
        this.setState({name: ''})
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
      }

    render(){
        return(
            <div>
            <form onSubmit={this.handleAddTeam}>
                <label>
                Add New Team:  
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
        );
    }
}
export default TeamForm;