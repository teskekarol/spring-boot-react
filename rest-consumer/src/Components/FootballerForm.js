import React, { Component } from 'react';
export const Options = ({options}) => (
    <select formid="addfootballer">
    {
        options.map((option, i) => 
            <option key={i} value={option.value}>{option.text}</option>
    )}
    </select>
)

class FootballerForm extends Component { 
    constructor(){
        super();
        this.state = {
            id: 0,
            name : '',
            age : 0,
            teamOptions: [{
                "text"  : "Option 1",
                "value" : "Value 1"
              },
              {
                "text"     : "Option 2",
                "value"    : "Value 2",
                "selected" : true
              },
              {
                "text"  : "Option 3",
                "value" : "Value 3"
              }]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/teams/')
        .then(function(response){
            console.log(response.status);
            if(response.status >= 400){
                throw new Error("Bad response > 400");
            }
            return response.json();
        })
        .then(function(data) {
            console.log("TEAMS")
            console.log(data)
          })
          .catch((err) => {
              return console.log(err)
          })
    }

    handleSubmit(event) {
        let newId;
        event.preventDefault();
        fetch('http://localhost:8080/api/footballers/', {
         method: 'post',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify(this.state)
        }).then((res) => {
            newId = res.headers.get('footballerid')
            this.setState({
                id: newId
            })
            this.props.addFootballer(this.state);
            this.setState({
                name: '',
                age: 0
            })
        });

        
      }

    handleChangeName(event) {
        this.setState({name: event.target.value});
      }
    handleChangeAge(event) {
        this.setState({age: event.target.value});
      }

    render(){
        return(
            <div>
            <form onSubmit={this.handleSubmit} id="addfootballer">
                <label>
                Name:
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                    <input type="text" value={this.state.age} onChange={this.handleChangeAge} />
                </label>
                <input type="submit" value="Submit" />
          </form>
          
          <Options options={this.state.teamOptions}/>

          </div>
        );
    }
}

export default FootballerForm;