import React, {useState, useEffect} from 'react';
import Flags from './FlagsList';
import axios from 'axios';

function App (){

    const [countries, setCountries] = useState([]);
    const [suggestions, setSuggestions] = useState([])
    const [vote, setVote] = useState('');

    //Retrives the countries's data from the db and set it in app's state
    function initCountries (){
        axios.get('/api/getCountries')
            .then((response) => {
                const data = response.data;
                console.log(response.data)
                setCountries(() => {return data})

            })
            .catch(() => alert('Error retriving countries data'))
    }
    

    //Initializing the state from the DB
    useEffect(() => initCountries(), [] )
    

    //Handles the change in the guess bar

    const autocomplete = (text) => {
        setVote(text);

        let listOfSuggestions =  []
        if(text.length > 0)
        {
            listOfSuggestions = countries.filter(country =>
                {

                    return !country.eliminated && country.countryName.toLowerCase().includes(text.toLowerCase())
                    console.log(!country.eliminated && country.countryName.toLowerCase().includes(text.toLowerCase()))
                }).map(country => {return country.countryName});
        }
        console.log("suggestions:" ,listOfSuggestions)


        setSuggestions(listOfSuggestions);

    }



    //Adds a new vote to the db
    function handleVote (event){
        const name = vote

        const indexOfcountry = countries.findIndex(country => country.countryName === name  )


        if (indexOfcountry > -1){
            const payload = {
                countryName: countries[indexOfcountry].countryName,
                countryId: countries[indexOfcountry].Id,
                counted: false
            }
            axios({
                url: '/api/castVote',
                method: 'POST',
                data: payload
             })
                .then(resp => console.log(resp))
                .catch(resp => console.log(resp))
        }else{
            console.log("User doesn't know how to spell")
        }
    }


    function handleElimination (){

        axios.get('/api/getElectionsResults')
            .then((response) => {
                const data = response.data;

                data.sort((a,b) => b.votes - a.votes)

                const payload = {
                    countryId: data[0]._id
                }
                axios({
                    url: '/api/eliminateCountry',
                    method: 'POST',
                    data: payload
                    })
                    .then(() => initCountries())
                    .catch((resp) => console.log(resp))    
                    
                    
                axios.post('/api/newElections')
                .then(resp => console.log(resp))
                .catch((resp) => console.log(resp))     

            })
            .catch(() => alert('Error retriving countries data'))             

 


    }
    
    return (
        <>
            <input key="DiePie" value={vote} onChange={text => autocomplete(text.target.value)} type= "text"/>
            {suggestions && suggestions.map((suggestion,i) => 
            <div key={i}>{suggestion}</div>)}
            <button key="Bitch" onClick={handleVote}>Submit vote</button>
            <button key="Lasagna" onClick={handleElimination}>Eliminate largest</button>
            <Flags countries={countries}  />
        </>
    )
}

export default App  