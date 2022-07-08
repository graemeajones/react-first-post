import { useState, useEffect } from 'react';
import API from './API.js';


export default function useFetch(endpoint) {

  // Fetch State ---------------------------------
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");
  const [data, setData] = useState(undefined);
  
  // Methods -------------------------------------
  useEffect(() => {

    const fetchObjects = async () => {
      const outcome = await API.get(endpoint);
      if (outcome.success) setData(outcome.response);
      else setLoadingMessage(`Error ${outcome.response.status}: Data could not be found.`);
    };
  
    fetchObjects();
  
  }, [endpoint]);
  
  // Return --------------------------------------
  return [data, setData, loadingMessage ];
}
