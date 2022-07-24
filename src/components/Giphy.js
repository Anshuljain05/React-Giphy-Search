import React, {useEffect, useState} from 'react';
import axios from 'axios';


function Giphy() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"
                }
            });
            console.log(results);
            setData(results.data.data);
        }
        fetchData();
    }, [])
    
    return (
        <div className=''>Giphy</div>
    )
}

export default Giphy