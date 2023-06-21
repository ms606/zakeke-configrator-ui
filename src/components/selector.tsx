//import 'bootstrap/dist/css/bootstrap.css';
import "./selector.css";
import { group, log } from "console";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage, ListItemColor } from "./list";

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
      //console.log(groups, price, "pkpkkpkpkpkp");

      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    //   console.log(groups,'groups','selectOption',selectOption);

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
    //console.log(groups,(currentIndex - 1 + groups.length)% groups.length);

    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    //selectGroup(groups[currentIndex].id);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);
  };

  const handleRightClick = () => {
    setCurrentIndex((currentIndex + 1) % groups.length);
    // selectGroup(groups[currentIndex].id);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);
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
        <div id="tray-header">
          <button className="previous-customization" onClick={handleLeftClick}>
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
                stroke-width="1.5"
                d="M11.021 18.967L4.055 12l6.966-6.967M4 12h17"
              ></path>
            </svg>
          </button>
          <div style={{ position: "relative", padding: "0px 100px" }}>
            <div className="active-marketing-component-name">
              <span style={{ fontSize: "18px", padding: "20px" }}>
                {groups[currentIndex].name}
              </span>
              <span className="active-marketing-component-index">
                {" "}
                {currentIndex + 1} / {groups.length}
              </span>
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
                stroke-width="1.5"
                d="M12.979 18.967L19.945 12 12.98 5.033M20 12H3"
              ></path>
            </svg>
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

        <div className="animate-wrapper">
          {selectedGroup && selectedGroup.steps.length > 0 && (
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
            {attributes &&
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
            {selectedAttribute &&
              selectedAttribute.options.map((option) => {
                // console.log('yyyyeeeeee', option);

                return (
                  <ListItemColor
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    selected={option.selected}
                  >
                    {option.imageUrl && <ListItemImage src={option.imageUrl} />}
                    {option.name}
                  </ListItemColor>
                );
              })}
          </List>
        </div>

        <h3>Price: {price}</h3>
        {isAddToCartLoading ? (
          "Adding to cart..."
        ) : (
          <button onClick={addToCart}>Add to cart</button>
        )}
      </Container>
    </>
  );
};

export default Selector;
