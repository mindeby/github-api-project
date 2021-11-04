import React from 'react';
import styled from 'styled-components'
import ListItem from './listItem';

const ReposList = ({list, saved, setSaved}) => {

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
            <List>
                {list && list.map((repo) => (
                    <ListItem key={repo.id} listItem={repo} handleFavourite={handleFavourite} saved={saved}/>
                ))}
           </List>
        );
}

export default ReposList

const List = styled.ul`
    padding: 0;
    margin: 0;
`
