import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ZakekeEnvironment, ZakekeViewer, ZakekeProvider } from 'zakeke-configurator-react';
import Selector from './selector';

// const Layout = styled.div`
//     display: grid;
//     grid-template-columns: auto;
//     grid-gap: 40px;
//     height: 100%;
//     padding: 0px;
//     font-family: "Helvetica Now Text",Helvetica,Arial,sans-serif;
// `

const Layout = styled.div`
    display: flex; 
    flex  
    height: 50%;
    width: 50%
    padding: 40px;
    flex-direction: column;
`

const zakekeEnvironment = new ZakekeEnvironment();

const App: FunctionComponent<{}> = () => {
    return <ZakekeProvider environment={zakekeEnvironment}> 
     <div id='modal-container' className='css-1q5ttm8'>
      <div className='css-1ecy5z8'>
       <Layout>
            <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center',gridArea: '1 / 2 / 12 / 1', backgroundColor: 'rgb(249 246 248)'}}>
            <div className='ThreeDRenderer' style={{width:'70vw', height:'70vh'}}>
                <ZakekeViewer />
            </div>             
            </div>
            <Selector />   
        </Layout>
      </div>         
     </div>
     </ZakekeProvider>;
}

export default App; 