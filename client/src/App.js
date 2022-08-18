import React from 'react';
import './index.css';
import { allCountries } from './domain/listOfCountries';
import { callPostfixs } from './domain/eliminationCalls';


/* const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Cluster23486:SElddn1IenFg@cluster23486.7gio09e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); */

a


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
