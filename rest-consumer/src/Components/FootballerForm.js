import React, { Component } from 'react';

class FootballerForm extends Component { 
    constructor(){
        super();
        this.state = {
            teamOptions: [],
            id: 0,
            name : '',
            age : 0,
            team: {
                id: 0
            }
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeTeam = this.handleChangeTeam.bind(this);
        this.handleAddFootballer = this.handleAddFootballer.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({teamOptions: nextProps.teamOptions})
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
      }
    handleChangeAge(event) {
        this.setState({age: event.target.value});
      }
    handleChangeTeam(event) {
        console.log("hello");
        this.setState({team: event.target.value});
      }

    handleAddFootballer(event){
        event.preventDefault();
        this.props.addFootballer(this.state.name,this.state.age,this.state.team.id)
        this.setState({name: '',age: 0})
    }

    render(){

        const createItem = (item, key) =>
        <option key={key}value={item.id}> {item.name} </option>;

        return(
            <div>
            <form onSubmit={this.handleAddFootballer} id="addfootballer">
                <label>
                Name:
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                    <input type="text" value={this.state.age} onChange={this.handleChangeAge} />
                </label>
                <select onChange={event => this.setState({ team: {id: event.target.value}})} value={this.state.value}>
                    { this.state.teamOptions.map(createItem) }
                </select>
                <input type="submit" value="Submit" />
            </form>
          </div>
        );
    }
}



export default FootballerForm;