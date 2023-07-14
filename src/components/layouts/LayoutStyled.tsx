import styled from 'styled-components/macro';

export const GroupItem = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
height: 100px;
width: 100px;
margin-bottom: 20px;
text-align: center;
cursor: pointer;
padding: 0px 10px 0px 10px;

&:hover {
    background-color: white;
}

&.selected {
    background-color: white;
}

span {
    font-size: 12px;
}

@media (max-width: 1025px) {
    min-width: 90px;
    padding-right: 5px;
}

@media (max-width: 1024px) {
    min-width: 110px;
    margin-bottom: 0;
    margin-right: 10px;
}
@media (max-width: 42px) {
    min-width: 100px;
}
`;

export const GroupIcon = styled.img`
width: 100%;
height: 40px;
object-fit: contain;
margin-bottom: 10px;
`;