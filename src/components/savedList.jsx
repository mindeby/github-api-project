import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import ListItem from './listItem';

const SavedList = ({list, saved, setSaved}) => {

    const [languageFilter, setLanguageFilter] = useState(null)
    const [sorted, setSorted] = useState(list)

    useEffect(() => {
        if (languageFilter !== null) {
            const sortedArray = list.filter(item => item.language === languageFilter)
            setSorted(sortedArray)
        } else {
            setSorted(list)
        }
    }, [languageFilter]);

    const languageList = saved.reduce((sorted, repo) => {
        sorted[repo.language] = saved.filter(item =>
          item.language?.includes(repo.language)
        );
        return sorted;
      }, {});

    const handleFavourite = (ev, repo) => {
        if (saved.filter(item => item.id === repo.id).length > 0) {
            setSaved(saved.filter(item => item.id !== repo.id))
            ev.target.closest('svg').classList.remove('active')
        } else {
            setSaved([...saved, repo])
            ev.target.closest('svg').classList.add('active')
        }
    }

    const handleSelection = (ev, lang) => {
        if (languageFilter !== lang) {
            setLanguageFilter(lang)
        } else {
            setLanguageFilter(null)
        }
    }

      return (
          <div>
            <Filter>
                {languageList && Object.keys(languageList).map(lang => (
                        lang !== 'null' &&
                            <Option active={lang === languageFilter} onClick={(ev) => handleSelection(ev, lang)}>
                            {lang}
                        </Option>
                ))}
            </Filter>
            <List>
                {sorted && sorted.map((repo) => (
                     <ListItem listItem={repo} handleFavourite={handleFavourite} saved={saved}/>
                ))}
                {sorted.length < 1 && <p>
                    Like a repo, come on!
                </p>}
           </List>
          </div>
        );
}

export default SavedList

const List = styled.ul`
    padding: 0;
    margin: 0;
`

const Filter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
        width: 100%;
        text-align: center;
        border: solid 1px grey;
        padding: 6px 12px;
        border-radius: 6px;
    }
`

const Option = styled.div`
    margin: 12px;
    background: ${props => (props.active ? ' #3C035F': 'none')};
    color: ${props => (props.active ? ' white': 'black')};
    @media (min-width: 768px) {
        cursor: pointer;
        &:hover {
            background-color: #3C035F;
            color: white;
            opacity: 80%;
        }
    }
`

