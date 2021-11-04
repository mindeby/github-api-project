import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import ReposList from '../components/reposList';
import SavedList from '../components/savedList';

const BestRepos = () => {
    const [repos, setRepos] = useState(null)
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('saved')) || [])
    const [openTab, setOpenTab] = useState('best')

    console.log(repos)
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

    const handleSelection = (ev) => {
        setOpenTab(ev.target.getAttribute('value'))
    }

      return (
       <Container>
           <Tabs onClick={(ev) => handleSelection(ev)}>
               <Tab value={'best'} open={openTab === 'best'}>Best of the Week</Tab>
               <Tab value={'saved'} open={openTab === 'saved'}>My Favourites</Tab>
           </Tabs>
           {openTab === 'best' ? 
                <ReposList list={repos} saved={saved} setSaved={setSaved}/>
                :
                <SavedList list={saved} saved={saved} setSaved={setSaved}/>
           }
       </Container>
        );
}

export default BestRepos

const Container = styled.div`
    padding: 16px 16px 0;
    li {
        list-style-type: none;
    }

    ul {
        margin-top: 0;
    }

    a {
        color: inherit;
    }
    max-width: 1440px;
    margin: auto;
    @media (min-width: 768px) {
        padding: 16px 0 0;
    }
`

const Tabs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 768px) {
        cursor: pointer;
    }
`

const Tab = styled.div`
    text-align: center;
    text-transform: uppercase;
    flex-basis: 50%;
    padding: 12px 0;
    display: flex;
    justify-content: center;
    font-weight: 600;
    color: ${props => (props.open ? 'white' : 'black')};
    border: ${props => (props.open ? 'solid 1px #a6abb0' : 'solid 1px transparent')};
    border-radius: ${props => (props.open ? '6px 6px 0 0' : '0')};
    border-bottom: ${props => (props.open ? 'none' : 'solid 1px #a6abb0')};
    background: ${props => (props.open ? 'linear-gradient(to bottom, #371765, #6e147c);' : 'solid 1px #a6abb0')};
`
