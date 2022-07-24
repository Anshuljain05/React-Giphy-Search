import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';
import Paginate from './Paginate';


function Giphy() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // page 1 item 1 - item 3
    // page 2 item 4 - item 6
    // page 3 item 7 - item 9
    // page 4 item 10 - item 12
    // page 5 item 13 - item 15
     

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                        limit: 15
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
    }, []);
    
    const renderGifs = () => {
        if (isLoading) {
            return <Loader/>
        }
        return currentItems.map(ele => {
            return (
                <div key={ele.id} className='gif'>
                    <img src={ele.images.fixed_height.url} alt=""></img>
                </div>
            )
        })
    };

    const renderError = () => {
        if (isError) {
            return (
                <div className='alert alert-danger alert-dismissible fade show' role="alert">
                    Unable to get Gifs, please try again in a few minutes
                </div>
            )
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                    q: search,
                    limit: 15
                }
            });

            setData(results.data.data);
        } catch (error) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        }
        
        setIsLoading(false);
    };

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <div className='m-2'>
            {renderError()}
            <form className='form-inline justify-content-center m-2 row'>
                <input value={search} onChange={handleSearchChange} type="text" placeholder='Article name or keywords' className='col-6' />
                <button onClick={handleSubmit} type='submit' className='btn btn-dark mx-2 col-2'>Search</button>
            </form>
            <div className='container gifs'>
                {renderGifs()}
            </div>
            <Paginate 
                pageSelected={pageSelected}
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                totalItems={data.length} 
            />
        </div>
    )
}

export default Giphy