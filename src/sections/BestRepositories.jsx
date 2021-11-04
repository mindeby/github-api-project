import React, { useState, useEffect } from 'react';

const BestRepos = () => {
    const [repos, setRepos] = useState([])

    useEffect(() => {
        let now = new Date().toISOString().slice(0, 10).toString();
        // refetch data everyday or if there are no records saved on local storage
        let refetch = !repos || localStorage.getItem('lastFetch') !== now;
        const creationDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).toString();
        const limitResults = '20';
        refetch && fetch(`https://api.github.com/search/repositories?q=created:%3E${creationDate}&sort=stars&order=desc&per_page=${limitResults}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
          })
            .then(res => res.json())
            .then(( data ) => {
                localStorage.setItem('lastFetch', now);
                localStorage.setItem('repositories', JSON.stringify(data.items));
                setRepos(data.items)
            }).catch(error => console.log(error))
      }, []);

      return (
       <div>

       </div>
    );
}

export default BestRepos

