import React from 'react';
import styled from 'styled-components'
import Icon from './icon'

const ListItem = ({listItem, handleFavourite, saved}) => {

      return (
            <Item key={listItem.id}>
                    <li key={listItem.id}>
                        <a href={listItem.url} target="_blank" rel="noreferrer">
                            <Name>{listItem.name}</Name>
                            <Description>{listItem.description}</Description>
                            {/* <p>{repo.language}</p> */}
                            <Stars>
                                <Icon type='star'/>
                                <span>[{listItem.stargazers_count}]</span>
                            </Stars>
                        </a>
                        <HeartWrapper onClick={(ev) => handleFavourite(ev, listItem)}>
                            <Icon type='heart' className={saved.filter(item => item.id === listItem.id).length > 0 ?  'active' : undefined}/>
                        </HeartWrapper>
                    </li>
           </Item>
        );
}

export default ListItem

const Item = styled.ul`
    padding: 0;
    margin: 0;
    p {
        margin: 0 0 12px;
    }
    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 12px 12px 12px 6px;
        text-align: left;
        border-bottom: solid 1px #a6abb0;

        a {
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
        @media (min-width: 768px) {
            &:hover {
                background: linear-gradient(to bottom, #371765, #6e147c);
                color: white;
                svg {
                    fill: white;
                }
            }
        }
    }
`
const Description = styled.p`
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0 10px;
    @media (min-width: 768px) {
        flex-grow: 1;
    }
`
const Name = styled.p`
    min-width: 40%;
    padding-right: 12px;
`


const Stars = styled.div`
    position: relative;
    margin: 0 12px;
    display: flex;
    align-items: center;
    svg {
        margin-right: 8px;
        fill: #464e57;
    }
`



const HeartWrapper = styled.div`
    cursor: pointer;
    margin: 0 12px;

    svg {
        &.active {
            path {
                fill: red;
            }
        }
    }
`
