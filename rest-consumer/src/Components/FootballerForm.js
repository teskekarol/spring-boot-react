import React, { Component } from 'react';

class FootballerForm extends Component { 
    constructor(){
        super();
        this.state = {
            name : '',
            age : 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/footballers/', {
         method: 'post',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify(this.state)
        }).then((res) => {
            console.log(res)
        }

        );
        this.props.addFootballer(this.state);
        this.setState({
            name: '',
            age: 0
        })
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
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                    <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                    <input type="text" value={this.state.age} onChange={this.handleChangeAge} />
                </label>
                <input type="submit" value="Submit" />
          </form>
          </div>
        );
    }
}

export default FootballerForm;