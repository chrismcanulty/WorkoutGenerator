import React, {useState, useEffect} from 'react';
import wger from '../api/wger';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  console.log('Hello');

  const searchApi = async (searchTerm: string) => {
    try {
      const response = await wger.get('/search', {
        params: {
          // limit: 50,
          // term: searchTerm,
          // location: 'vancouver',
        },
      });
      // response.data will be response body, we care about businesses data
      // so we can access response.data.businesses and set the data to state
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);

  return [searchApi, results, errorMessage];
};
