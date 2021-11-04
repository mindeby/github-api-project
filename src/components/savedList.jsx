import React from 'react';
import styled from 'styled-components'
import Icon from './icon'
import ListItem from './listItem';

const SavedList = ({list, saved, setSaved}) => {

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
                     <ListItem listItem={repo} handleFavourite={handleFavourite} saved={saved}/>

                ))}
                {list.length < 1 && <p>
                    Like a repo, come on!
                    </p>}
           </List>
        );
}

export default SavedList

const List = styled.ul`
    padding: 0;
    margin: 0;
`
