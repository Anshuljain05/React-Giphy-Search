import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';


function Giphy() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"
                }
            });

            console.log(results);
            setData(results.data.data);

            } catch (error) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
            }            
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
    const renderError = () => {
        if (isError) {
            return (
                <div className='alert alert-danger alert-dismissible fade show' role="alert">
                    Unable to get Gifs, please try again in a few minutes
                </div>
            )
        }
    }
    return (
        <div className='m-2'>
            {renderError()}
            <div className='container gifs'>
                {renderGifs()}
            </div>
        </div>
    )
}

export default Giphy