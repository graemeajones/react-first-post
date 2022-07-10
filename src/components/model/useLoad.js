import { useState, useCallback, useEffect } from 'react';

export default function useLoad(accessor) {
  // Load State ----------------------------------
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Methods -------------------------------------
  const loadData = useCallback(() => {
    accessor.list()
      .then((outcome) => (outcome.success)
        ? setData(outcome.response)
        : setLoadingMessage(`Error ${outcome.response}: Data could not be found.`)
      )
  }, [accessor]);
    
  useEffect( () => loadData(), [loadData]);

  // Return --------------------------------------
  return [data, setData, loadingMessage, loadData ];
}
