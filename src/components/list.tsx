import styled from "styled-components";

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 24px; 
    border-radius: 50px;
    white-space: nowrap;
    justify-content: center;

    @media screen and (max-width: 568px) {
        width: 100vw;
        transform-origin: 50% 50% 0px;
        transform: translate3d(-186.507px, 0px, 0px) scale(1, 1);
        position: relative;
        left: 60vw;
        }

`;

    
export const ListItem = styled.li<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;    
    font: 500 1.1rem/1.5 'Inter';
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    border: 1px #DDD solid;
    cursor: pointer;
    margin: 0 10px;
    border-radius: 50px;
    width: 152px;
    height: 36px;
    border-color: ${props => props.selected ? 'black' : '#DDD'};
    white-space: nowrap;
    &:hover {
        background-color: #ffd966;
    }
    @media screen and (max-width: 568px) {
      font: 500 .8rem/1.8 'Inter';
      margin: 0 7px;
      padding: 0px 7px;
      width: 132px;
      height: 33px;
    }
`;

export const ListItemColor = styled.li<{ selected?: boolean, selectedColor?: any}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0 11px;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    white-space: nowrap;  
    font-size: 12px;  
    border-color: ${props => props.selected ? 'black' : '#DDD'};

    &:hover {
        background-color: #D8D8D8;
    };
    
    &:before {
        content: '';
        position: absolute;
        bottom: 20%;
        /* Additional styling for the :before pseudo-element can be added here */
    };

    &:after {
    content: "${props => { return props.selected ? props.selectedColor : ''
                        }}";
    position: absolute;
    bottom: 20%;
    // transform: translateY(38px);
    /* Additional styling for the :before pseudo-element can be added here */
    }
    
    
    @media screen and (max-width: 568px) {
    &:after {
      bottom: -65%;  
    }
    }`;

export const ListItemImage = styled.img<{ selected?: any }>`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin: 0px 11px;
    border-radius: 100%;
    border: 1px solid rgb(229, 229, 229);
    
    @media screen and (max-width: 568px) {
      width: 30px;
      height: 30px;
      margin: 0px 8px;
    }
`