import React, {useState, useRef, useEffect} from 'react';
import Flags from './FlagsList';
import axios from 'axios';

function App (){

    let [countries, setCountries] = useState([]);
    const countryNameRef = useRef();

    
    function initCountries (){
        axios.get('/api/getCountries')
            .then((response) => {
                const data = response.data;
                console.log(response.data)
                setCountries(() => {
                    return data
                })

            })
            .catch(() => alert('Error retriving countries data'))
    }

    //Initializing the state from the DB
    useEffect(() => initCountries(), [] )

    
    
    
    function handleVote (event){
        const name = countryNameRef.current.value

        const indexOfcountry = countries.findIndex(country => country.countryName === name  )


        if (indexOfcountry > -1){
            const payload = {
                countryName: countries[indexOfcountry].countryName,
                countryId: countries[indexOfcountry].Id
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

            })
            .catch(() => alert('Error retriving countries data'))             

 


    }

   /*  function handleElimination (){
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
    } */
    
    


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