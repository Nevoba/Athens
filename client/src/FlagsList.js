import React from 'react';
import Country from './country';




export default function Flags ({countries}){
    return (
        countries.map( country => { 
            if(!country.eliminated){
                return <Country key = {country.id} country ={country} />}
                return undefined
        })
    )
}

