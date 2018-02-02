import React, {Component} from 'react';
import FootballerForm from './FootballerForm'

class Footballers extends Component{

    constructor(props){
        super(props);
        this.state = {
            footballers: [],
            teams: []
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({footballers: nextProps.att.footballers})
        this.setState({teams: nextProps.att.teams})
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
                        <button onClick={()=>this.props.handleDeleteFootballer(footballer.id)}>x</button>
                    </div>
                ))}

                <button onClick={this.echostate.bind(this)}>footballers.js state</button>

                <FootballerForm teamOptions={this.state.teams} addFootballer={this.props.addFootballer}/>
            </div>
        )
    }
} 

export default Footballers;