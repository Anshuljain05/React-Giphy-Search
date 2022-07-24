import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';


function Giphy() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"
                }
            });
            console.log(results);
            setData(results.data.data);
            setIsLoading(false);
        }
        fetchData();
    }, [])
    
    const renderGifs = () => {
        if (isLoading) {
            return <Loader/>
        }
        return data.map(ele => {
            return (
                <div key={ele.id} className='gif'>
                    <img src={ele.images.fixed_height.url} alt=""></img>
                </div>
            )
        })
    } 
    return (
        <div className='container gifs'>{renderGifs()}</div>
    )
}

export default Giphy