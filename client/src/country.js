import React from 'react';


export default function Country ({country}){
    const imgSrc = 'countries/' + country.name +'.svg'
    return (
        <div>
            
            <img key={country.id} src= {imgSrc} alt={country.name}/>
        </div>
    )
}

