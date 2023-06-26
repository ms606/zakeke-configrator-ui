//import 'bootstrap/dist/css/bootstrap.css';
import "./selector.css";
import { group, log } from "console";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage, ListItemColor } from "./list";
import Tray from "./Tray";

const Container = styled.div`
  height: 230px;
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
    productName,
  } = useZakeke();

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  const [selectedColorName, selectColorName] = useState<any | null>(null);

  // Get a list of all group names so we can populate on the tray
  const [selectedGroupList, selectGroupList] = useState<any | null>(null);

  // Open tray for menu
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  // Get the id of the selected group from the tray 
  const [selectedGroupIdFromTray, selectGroupIdFromTray] = useState<number | null>(null);

  //   const selectedOptionColor = (colorName: any) => {
  //     console.log('selected Color', colorName);

  //   }

  // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups.length > 0) {
      
      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (groups.length > 0) {
      var groupRec: string[] = [];
      groups.map((group) => groupRec.push(group.name));
      selectGroupList(groupRec);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length > 0)
      selectAttribute(attributes[0].id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes]);

  useEffect(() => {
    if (selectedGroup) {
      const camera = selectedGroup.cameraLocationId;
      if (camera) setCamera(camera);
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
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);
  };

  const handleRightClick = () => {
    setCurrentIndex((currentIndex + 1) % groups.length);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);
  };

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  const groupIdFromFunc = (data:any) => {
     //console.log('ayyy',groups,data);
    const filteredArray = groups.filter((group) => group.name === data);
    // const filteredArrayId = groups.filter((group) => group.name === data);

  //  console.log(filteredArrayId, 'sddfasfdafdsf');
    


    const filteredArrayId = groups.filter((i:any, index:number) => {
      // Perform the desired comparison
      return i.name === data;
    });
    
    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemId = foundItem.id;
      const foundItemIndex = groups.indexOf(foundItem);
      console.log('Found ID:', foundItemId);
      console.log('Found Index:', foundItemIndex);
      setCurrentIndex(foundItemIndex)
    } 

    selectGroup(filteredArray[0].id);    
    selectGroupIdFromTray(filteredArray[0].id);
  };


  return (
    <>
      <div className="top-nav">
        <div id="product-info">
          <span>{productName}</span>
          <span>${price}</span>
        </div>
      </div>

      <Container>
        <div className="tray-header">
          <button className="tray-preview-open-button">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M18.966 8.476L12 15.443 5.033 8.476"
              ></path>
            </svg>
          </button>

          <div style={{ display: "flex" }}>
            <button
              className="previous-customization"
              onClick={handleLeftClick}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M11.021 18.967L4.055 12l6.966-6.967M4 12h17"
                ></path>
              </svg>
            </button>
            <div className="tray-header-1">
              <div style={{ position: "relative", padding: "0px 100px" }}>
                <div className="active-marketing-component-name">
                  <span style={{ fontSize: "18px" }}>
                    {groups[currentIndex].name}
                  </span>
                  <span className="active-marketing-component-index">
                    {" "}
                    {currentIndex + 1} / {groups.length}
                  </span>
                </div>
              </div>
            </div>
            <button className="next-customization" onClick={handleRightClick}>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M12.979 18.967L19.945 12 12.98 5.033M20 12H3"
                ></path>
              </svg>
            </button>
          </div>
          <button className="tray-trigger-open-button" onClick={toggleTray}>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
              id="tray-trigger-button-icon"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M21 5.25H3M21 12H3m18 6.75H3"
              ></path>
            </svg>
            <span style={{ marginLeft: "3px" }}>Menu</span>
          </button>
        </div>

        <br />

        {/* <List>
            {groups.map(group => {
                return <ListItem key={group.id} onClick={() => {
                    selectGroup(group.id)
                }} selected={selectedGroup === group}> {group.id === -1 ? 'Other' : group.name}</ListItem>;
            })}
        </List> */}

        <div className={`animate-wrapper${isTrayOpen ? "-2 show" : ""}`}>
          {isTrayOpen && (
            <Tray groupNameList={selectedGroupList} toggleFunc={toggleTray} UpdateGroupId={groupIdFromFunc}/>
          )}
          {selectedGroup && selectedGroup.steps.length > 0 && !isTrayOpen && (
            <List>
              {selectedGroup.steps.map((step) => {
                return (
                  <ListItem
                    key={step.id}
                    onClick={() => selectStep(step.id)}
                    selected={selectedStep === step}
                  >
                    Step: {step.name}
                  </ListItem>
                );
              })}
            </List>
          )}

          <List>
            {attributes && !isTrayOpen && 
              attributes.map((attribute) => {
                return (
                  <ListItem
                    key={attribute.id}
                    onClick={() => selectAttribute(attribute.id)}
                    selected={selectedAttribute === attribute}
                  >
                    {attribute.name}
                  </ListItem>
                );
              })}
          </List>

          <List>
            {selectedAttribute && !isTrayOpen &&
              selectedAttribute.options.map((option) => {
                return (
                  <ListItemColor
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    selected={option.selected}
                    selectedColor={selectedColorName}
                  >
                    {option.imageUrl && (
                      <ListItemImage
                        src={option.imageUrl}
                        onClick={() => selectColorName(option.name)}
                        selected={option.selected}
                      />
                    )}
                    {/* //{option.name} */}
                  </ListItemColor>
                );
              })}
            {/* {selectedColorName}   */}
          </List>
        </div>
      </Container>
    </>
  );
};

export default Selector;
