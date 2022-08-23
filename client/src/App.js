import React, {useState, useRef} from 'react';
import Flags from './FlagsList';

function App (){
    let [countries, castVote] = useState([{id: 1, name: 'Israel', votes: 0, eliminated: false},{id: 2, name: 'Japan', votes: 0, eliminated: false},{id: 3, name: 'Switzerland', votes: 0, eliminated: false}]);
    const countryNameRef = useRef();


    function handleVote (event){
        const name = countryNameRef.current.value
        const indexOfcountry = countries.findIndex(country => country.name === name  )
        if (indexOfcountry > -1){
            castVote(cVote => {
                cVote[indexOfcountry].votes++
                return cVote
            })
            console.log(countries[indexOfcountry].votes)

        }else{
            console.log("User doesn't know how to spell")
        }
    }

    function handleElimination (){
        let maxVotes = 0
        countries.forEach(country => {if(country.votes > maxVotes && country.eliminated === false){maxVotes = country.votes}})
        const indexOfcountry = countries.findIndex(country => country.votes === maxVotes)
        castVote(cVote => {
            console.log(indexOfcountry)
            cVote[indexOfcountry].eliminated = true
            return cVote
        })
    }
    
    


    return (
        <>
            <input key="DiePie" ref={countryNameRef} type= "text"/>
            <button key="Bitch" onClick={handleVote}>Submit vote</button>
            <button key="Lasagna" onClick={handleElimination}>Eliminate largest</button>
            <div key="Pew">You have voted for Israel {countries[0].votes}</div>
            <Flags countries={countries}  />
        </>
    )
}

export default App  