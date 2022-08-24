import React, {useState, useRef, useEffect} from 'react';
import Flags from './FlagsList';
import axios from 'axios';

function App (){
/*     let [countries, castVote] = useState([{id: 1, name: 'Israel', votes: 0, eliminated: false},{id: 2, name: 'Japan', votes: 0, eliminated: false},{id: 3, name: 'Switzerland', votes: 0, eliminated: false}]);
    const countryNameRef = useRef();


    
    function handleVote (event){
        const name = countryNameRef.current.value
        const indexOfcountry = countries.findIndex(country => country.name === name  )

        if (indexOfcountry > -1){
            castVote(cVote => {
                cVote[indexOfcountry].votes++
                return [...cVote]
            })

        }else{
            console.log("User doesn't know how to spell")
        }
    } */

    

    
    

    let [countries, setCountries] = useState([]);
    const countryNameRef = useRef();

    
    function initCountries (){
    axios.get('/api/getCountries')
        .then((response) => {
            const data = response.data;

            setCountries(() => {
                return data
            })

        })
        .catch(() => alert('Error retriving countries data'))
    }

    //Initializing the state from the DB
    useEffect(() => initCountries(), [] )

    
    
    
    function handleVote (event){
        console.log(countries)
        const name = countryNameRef.current.value

        const indexOfcountry = countries.findIndex(country => country.name === name  )


        if (indexOfcountry > -1){
            const payload = {
                countryName: countries[indexOfcountry].name,
                countryId: countries[indexOfcountry].id
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
        let maxVotes = 0
        countries.forEach(country => {if(country.votes > maxVotes && country.eliminated === false){maxVotes = country.votes}})
        const indexOfcountry = countries.findIndex(country => country.votes === maxVotes && country.eliminated === false)
        if(indexOfcountry === -1){
            return undefined
        }else{
            setCountries(cVote => {
                cVote[indexOfcountry].eliminated = true
                return [...cVote]})
        }
    }
    

    function getElectionResults(){
        axios.get('/api/getVotes')
        .then((response) => {
        })
        .catch(() => alert('Error retriving election results'))
    }

    


    return (
        <>
            <input key="DiePie" ref={countryNameRef} type= "text"/>
            <button key="Bitch" onClick={handleVote}>Submit vote</button>
            <button key="Lasagna" onClick={handleElimination}>Eliminate largest</button>
            <Flags countries={countries}  />
        </>
    )
}

export default App  