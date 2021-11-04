import React, { useState, useEffect } from 'react';

const BestRepos = () => {
    const [repos, setRepos] = useState([])

    useEffect(() => {
        const creationDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).toString();
        const limitResults = '20';
        fetch(`https://api.github.com/search/repositories?q=created:%3E${creationDate}&sort=stars&order=desc&per_page=${limitResults}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
          })
            .then(res => res.json())
            .then(( data ) => {
                localStorage.setItem('repositories', JSON.stringify(data.items));
                setRepos(data.items)
            }).catch(error => console.log(error))
      }, []);

      console.log(repos)

      return (
       <div>

       </div>
    );
}

export default BestRepos

