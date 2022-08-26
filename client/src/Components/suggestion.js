import React from 'react';


export default function Suggestion (suggestion, i){
    console.log(suggestion)
    return (
        <div key ={i}>
             {suggestion.suggestion}
        </div>
    )
}

