import React, {useState} from 'react';
import Flags from './FlagsList';

function App (){
    const [countries, vote] = useState(['Israel','Japan']);
    return (
        <>
            <input type= "text"/>
            <button>Submit vote</button>
            <button>Eliminate largest</button>
            <Flags countries={countries}  />
        </>
    )
}

export default App  