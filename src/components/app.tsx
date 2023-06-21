import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ZakekeEnvironment, ZakekeViewer, ZakekeProvider } from 'zakeke-configurator-react';
import Selector from './selector';

const Layout = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 40px;
    height: 100%;
    padding: 30px;
    font-family: "Helvetica Now Text",Helvetica,Arial,sans-serif;
`

// const Layout = styled.div`
//     display: flex;
//     height: 100%;
//     padding: 40px;
// `

const zakekeEnvironment = new ZakekeEnvironment();

const App: FunctionComponent<{}> = () => {
    return <ZakekeProvider environment={zakekeEnvironment}>
        <Layout>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',gridArea: '1 / 2 / 11 / 1'}}>
           <div className='ThreeDRenderer' style={{width:'661px', height:'348px'}}>
            <ZakekeViewer />
           </div>             
         </div>
         <Selector />   
        </Layout>
    </ZakekeProvider>;
}

export default App; 