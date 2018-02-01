import React, {Component} from 'react';
import FootballerForm from './FootballerForm'

class Footballers extends Component{

    constructor(props){
        super(props);
        this.state = {
            footballers: [],
            teams: []
        }
        this.deleteFootballer = this.deleteFootballer.bind(this);
    }

    componentWillReceiveProps(nextProps){
        
        console.log("prop.team " + nextProps.att.teams.length )
        console.log("prop foot " + nextProps.att.footballers.length )

        this.setState({footballers: nextProps.att.footballers})
        this.setState({teams: nextProps.att.teams})
    }

    componentDidMount(){
        this.setState({})
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

    echostate(){
        console.log(this.state)
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

                <button onClick={this.echostate.bind(this)}>footballers.js state</button>

                <FootballerForm teamOptions={this.state.teams} addFootballer={this.props.addFootballer}/>
            </div>
        )
    }
} 

export default Footballers;