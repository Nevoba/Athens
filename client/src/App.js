import React from 'react';
import Flags from './Flags';

function App (){
    return (
        <>
            <input type= "text"/>
            <button>Submit vote</button>
            <button>Eliminate largest</button>
            <Flags />
        </>
    )
}

export default App