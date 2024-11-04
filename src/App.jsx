import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [Getsearch, setSearch] = useState('');
  const apiKey = "271e7c2a"; // Consider using environment variables

  const getData = async (search) => {
    setLoading(true);
    setError(''); // Reset error state
    const api = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;
    try {
      const response = await axios.get(api);
      if (response.data.Response === "True") {
        setData(response.data.Search);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError('Failed to fetch data. Please try again later.'); // Set error message
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (Getsearch.trim()) {
      getData(Getsearch);
    }
  };

  return (
    <>
      <div className="main py-3 px-20">
        <div className="appbar w-full">
          <ul className='flex justify-end gap-5 text-white'>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="main-header text-white mt-10 flex justify-between items-center">
          <div className="logo">
            <h1 className='text-2xl font-semibold'>moviewind</h1>
          </div>
          <div className="nav-bar flex gap-5 items-center">
            <ul className='flex gap-5 items-center'>
              <li><a href="#">Hollywood</a></li>
              <li><a href="#">Bollywood</a></li>
              <li><a href="#">Korean</a></li>
              <li><a href="#">Series</a></li>
              <li><a href="#">Others</a></li>
            </ul>
            <form onSubmit={formSubmit}>
              <input
                type="text"
                placeholder='Search'
                className='bg-slate-700 px-2 py-2 rounded'
                value={Getsearch}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="card-div mt-10 flex flex-wrap gap-2">
          {loading && 
            <div className="flex items-center justify-center w-full h-[20rem]">
              <p className="text-white">Loading...</p>
            </div>
          }
          {!loading && error && 
            <div className="flex items-center justify-center w-full h-[20rem]">
              <p className="text-red-500">{error}</p>
            </div>
          }
          {!loading && data.length === 0 && 
            <div className="flex items-center justify-center w-full h-[20rem]">
              <p className="text-white">No results found.</p>
            </div>
          }
          {data.map((movie) => (
            <div key={movie.imdbID} className="card w-52 outline-dotted outline-blue-300 border-blue-400 rounded-lg text-white">
              <img src={movie.Poster} className='w-full rounded-lg' alt={movie.Title} />
              <h1 className='font-serif text-center p-5'>{movie.Title}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
