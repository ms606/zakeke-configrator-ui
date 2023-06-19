//import 'bootstrap/dist/css/bootstrap.css';
import './selector.css'
import { group } from 'console';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useZakeke } from 'zakeke-configurator-react';
import { List, ListItem, ListItemImage } from './list';

const Container = styled.div`
    height: 100%;
    overflow: auto;
`;

const Selector: FunctionComponent<{}> = () => {

    const {
        isSceneLoading,
        isAddToCartLoading,
        price,
        groups,
        selectOption,
        addToCart,
        templates,
        setTemplate,
        setCamera,
    } = useZakeke();

    // Keep saved the ID and not the refereces, they will change on each update
    const [selectedGroupId, selectGroup] = useState<number | null>(null);
    const [selectedStepId, selectStep] = useState<number | null>(null);
    const [selectedAttributeId, selectAttribute] = useState<number | null>(null);

    const selectedGroup = groups.find(group => group.id === selectedGroupId);
    const selectedStep = selectedGroup ? selectedGroup.steps.find(step => step.id === selectedStepId) : null;

    // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
    const attributes = useMemo(() => (selectedStep || selectedGroup)?.attributes ?? [], [selectedGroup, selectedStep]);
    const selectedAttribute = attributes.find(attribute => attribute.id === selectedAttributeId);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Open the first group and the first step when loaded
    useEffect(() => {
        if (!selectedGroup && groups.length > 0) {
            selectGroup(groups[0].id);

            if (groups[0].steps.length > 0)
                selectStep(groups[0].steps[0].id);

            if (templates.length > 0)
                setTemplate(templates[0].id)
        }
     //   console.log(groups,'groups','selectOption',selectOption);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGroup, groups]);

    // Select attribute first time
    useEffect(() => {
        if (!selectedAttribute && attributes.length > 0)
            selectAttribute(attributes[0].id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAttribute, attributes])

    useEffect(() => {
        if (selectedGroup) {
            const camera = selectedGroup.cameraLocationId;
            if (camera)
                setCamera(camera);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGroupId]);

    if (isSceneLoading || !groups || groups.length === 0)
        return <span>Loading scene...</span>;

    // groups
    // -- attributes
    // -- -- options
    // -- steps
    // -- -- attributes
    // -- -- -- options

    const handleLeftClick = () => {
        setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
      };
    
      const handleRightClick = () => {
        setCurrentIndex((currentIndex + 1) % groups.length);
      };
    
    return <Container>

     <div id='tray-header'>
      <button onClick={handleLeftClick}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M11.021 18.967L4.055 12l6.966-6.967M4 12h17"></path></svg>
      </button>
        <span style={{fontSize: '18px', padding: '20px'}}>{groups[currentIndex].name}</span>
      <button onClick={handleRightClick}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M12.979 18.967L19.945 12 12.98 5.033M20 12H3"></path></svg>
      </button>
     </div> 

     
      <br />
      <br />
      <br />
      <br />

        <List>
            <h2>List 1</h2>
            {groups.map(group => {
                return <ListItem key={group.id} onClick={() => {
                    selectGroup(group.id)
                }} selected={selectedGroup === group}>Group: {group.id === -1 ? 'Other' : group.name}</ListItem>;
            })}
        </List>


        {selectedGroup && selectedGroup.steps.length > 0 && <List>
            <h2>List 2</h2>
            {selectedGroup.steps.map(step => {
                return <ListItem key={step.id} onClick={() => selectStep(step.id)} selected={selectedStep === step}>Step: {step.name}</ListItem>;
            })}
        </List>}

        <List>
          <h2>List 3</h2>
            {attributes && attributes.map(attribute => {
                return <ListItem key={attribute.id} onClick={() => selectAttribute(attribute.id)} selected={selectedAttribute === attribute}>Attribute: {attribute.name}</ListItem>;
            })}
        </List>

        <List>
            <h2>List 4</h2>
            {selectedAttribute && selectedAttribute.options.map(option => {
               // console.log('yyyyeeeeee', option);
                
                return <ListItem key={option.id} onClick={() => selectOption(option.id)} selected={option.selected}>
                    {option.imageUrl && <ListItemImage src={option.imageUrl} />}
                    Option: {option.name}
                </ListItem>;
            })}
        </List>

        <h3>Price: {price}</h3>
        {isAddToCartLoading ? 'Adding to cart...' : <button onClick={addToCart}>Add to cart</button>}

    </Container>
}

export default Selector;