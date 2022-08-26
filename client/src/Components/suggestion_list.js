import React from 'react';
import Suggestion from './suggestion';




export default function SuggestionList ({suggestions}){
    return (
        suggestions.map( (suggestion,i) => { 
            if(i < 5){
                return <Suggestion key = {i} suggestion ={suggestion} />}
                /* return undefined */
        })
    )
}

