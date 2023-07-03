import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ZakekeEnvironment, ZakekeViewer, ZakekeProvider } from 'zakeke-configurator-react';
import Selector from './selector';

const Layout = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 40px;
    height: 100%;
    padding: 0px;
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',gridArea: '1 / 2 / 12 / 1', backgroundColor: 'rgb(249 246 248)'}}>
        <div className='ThreeDRenderer' style={{width:'861px', height:'548px'    }}>
            <ZakekeViewer />
        </div>             
        </div>
        <Selector />   
     </Layout>
     
        
    </ZakekeProvider>;
}

export default App; 