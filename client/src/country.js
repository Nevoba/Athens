import React from 'react';


export default function Country ({country}){
    const imgSrc = 'countries/' + country.countryName +'.svg'
    return (
        <div>
            <img key={country.countryId} src= {imgSrc} alt={country.countryName}/>
        </div>
    )
}

