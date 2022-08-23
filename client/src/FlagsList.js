import React from 'react';
import Country from './country';




export default function Flags ({countries}){
    return (
        countries.map( country => {
            return <Country Key = {country} country ={country} />
        })
    )
}

