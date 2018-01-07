import React, {Component} from 'react';
import FootballerForm from './FootballerForm'

class Footballers extends Component{

    constructor(){
        super();
        this.state = {
            footballers: []
        }
        this.deleteFootballer = this.deleteFootballer.bind(this);
        this.addFootballer = this.addFootballer.bind(this);
    }

    componentDidMount(){
        var that = this;
        this.setState({name: "karol"})
        fetch('http://localhost:8080/api/footballers/')
        .then(function(response){
            console.log(response.status);
            if(response.status >= 400){
                throw new Error("Bad response > 400");
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            that.setState({footballers: data})
          })
          .catch((err) => {
              return console.log(err)
          })
    }

    addFootballer(newFootballer){
        this.state.footballers.push(newFootballer);
        this.setState({
            footballers : this.state.footballers
        })
    }

    deleteFootballer(id){
        console.log("pressed" + id)
        fetch("http://localhost:8080/api/footballers/"+id+"/", {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }).then(res => {
              console.log(id + this.state.footballers)
              let helper = this.state.footballers;
              let removed = helper.filter(function(el){
                  return el.id !== id;
              })
              console.log(removed)
              this.setState({footballers : removed})
            })
    }

    render(){
        return (
            <div>
                <p>Footballers</p>
                {this.state.footballers.map((footballer,i) => (
                    <div key={i}>
                        <span> {footballer.name} </span>
                        <button onClick={()=>this.deleteFootballer(footballer.id)}>x</button>
                    </div>
                ))}

                <FootballerForm addFootballer={this.addFootballer}/>
            </div>
        )
    }
} 

export default Footballers;

/**
  componentDidMount(){
        var that = this;
        this.setState({name: "karol"})
        fetch('http://localhost:8080/api/footballers/14/')
        .then(function(response){
            console.log(response.status);
            if(response.status >= 400){
                throw new Error("Bad response > 400");
            }
            return response.json();
        })
        .then(function(data) {
            that.setState({name: data.name})
          })
          .catch((err) => {
              return console.log(err)
          })
    }
 */