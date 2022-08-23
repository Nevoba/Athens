import React from 'react';
import { allCountries } from './domain/listOfCountries';
import { callPostfixs } from './domain/eliminationCalls';


class App extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            votes: allCountries,
            eliminationCall: '',
        };
    }

    handleSubmit(val){

        const newVotes = this.state.votes
        newVotes[val.state.Value][0]++
        this.setState({votes: newVotes })
        console.log(this.state.votes[val.state.Value][0])
    }

    handleDelete(){

        const newVotes = this.state.votes
        
        
        let mostHated = null
        let highestVotes = -1
        Object.keys(this.state.votes).forEach((country) => {
            if(highestVotes < this.state.votes[country][0] && this.state.votes[country][1]){
                mostHated =  country;
                highestVotes = this.state.votes[country][0]
            }
        })

        const tempEliCall = mostHated + callPostfixs[Math.floor(Math.random()*callPostfixs.length)];

        newVotes[mostHated][1] = false
        this.setState({votes: newVotes,  eliminationCall: tempEliCall})
    }

    render(){

        const flags = Object.keys(this.state.votes).map((country) =>{
            const imgSrc = 'countries/' + country +'.svg';
            return this.state.votes[country][1]? <img key={country} src= {imgSrc} alt='test'/> : '';
        });


        return (
                <div>
                    <CountryForm handleDelete={(val) => this.handleDelete(val)} handleSubmit ={(val) => this.handleSubmit(val)}/>
                    <h1>
                        {this.state.eliminationCall}
                    </h1>
                    {flags}
                </div>
                
        
        )
    }
    
}

class CountryForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            Value: ''
        };

        this.handleSubmit = this.props.handleSubmit
        this.handleDelete = this.props.handleDelete
        this.handleType = this.handleType.bind(this);
    }

    handleType(event){
        this.setState({Value: event.target.value});
        event.preventDefault();
    }


    render(){
        return (
            <div>
                <input type="text" value={this.state.Value} onChange={this.handleType.bind(this)}/>
                <button onClick={() => this.handleSubmit(this)}>
                Submit
                </button>
                <button onClick={() => this.handleDelete(this)}>
                Eliminate largest
                </button>
            </div>
        )
    }
}


export default App;
