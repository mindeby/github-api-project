import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Icon from '../components/icon'

const BestRepos = () => {
    const [repos, setRepos] = useState(null)
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('saved')) || [])

    //data fetching
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

    //update local storage everytime there is a change to the saved array
    useEffect(() => {
        localStorage.setItem('saved', JSON.stringify(saved));
    }, [saved]);

    const handleFavourite = (ev, repo) => {
        if (saved.filter(item => item.id === repo.id).length > 0) {
            setSaved(saved.filter(item => item.id !== repo.id))
            ev.target.closest('svg').classList.remove('active')
        } else {
            setSaved([...saved, repo])
            ev.target.closest('svg').classList.add('active')
        }
    }

      return (
       <Container>
            <ul>
                {repos && repos.map((repo) => (
                    <li key={repo.id}>
                        <a href={repo.url} target="_blank" rel="noreferrer">
                            <p>{repo.name}</p>
                            <p>{repo.description}</p>
                            <p>{repo.language}</p>
                            <p>{repo.stargazers_count}</p>
                        </a>
                        <HeartWrapper onClick={(ev) => handleFavourite(ev, repo)}>
                            <Icon type='heart' className={saved.filter(item => item.id === repo.id).length > 0 ?  'active' : undefined}/>
                        </HeartWrapper>
                    </li>
                ))}
           </ul>
       </Container>
        );
}

export default BestRepos

const Container = styled.div`
    li {
        position: relative;
    }
`


const HeartWrapper = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;

    svg.active {
        path {
            fill: red;
        }
    }
`
