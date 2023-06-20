import styled from "styled-components";

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap:wrap;
    border-radius: 50px;
    white-space: nowrap;
`;

export const ListItem = styled.li<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    border: 1px #DDD solid;
    cursor: pointer;
    margin: 0 32px;
    border-radius: 50px;
    width: 152px;
    height: 36px;
    border-color: ${props => props.selected ? 'black' : '#DDD'};
    white-space: nowrap;
    overflow: 'hidden';
    &:hover {
        background-color: #ffd966;
    }
`;

export const ListItemColor = styled.li<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    
    cursor: pointer;
    margin: 0 32px;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    white-space: nowrap;
    overflow: 'hidden';
    border-color: ${props => props.selected ? 'black' : '#DDD'};

    &:hover {
        background-color: #ffd966;
    }
`;

export const ListItemImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin: 0px 11px;
    border-radius: 100%
`

// top: 0px;
//     border: none;
//     outline: none;
//     
//     overflow: hidden;
//     position: relative;
//     width: 40px;
//     height: 40px;
//     background-color: transparent;
