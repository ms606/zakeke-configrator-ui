import styled from "styled-components";

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap:wrap;
    border-radius: 50px;

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

    &:hover {
        background-color: #ffd966;
    }
`;

export const ListItemImage = styled.img`
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 20px;
`
