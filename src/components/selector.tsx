//import 'bootstrap/dist/css/bootstrap.css';
import "./selector.css";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage, ListItemColor, ListItemColorWithCarousel, ListItemImageNoCarousel} from "./list";
import { PreviewContainer, BlurOverlay } from "./previewContainer";
import Tray from "./Tray";
import TrayPreviewOpenButton from "./TrayPreviewOpenButton";
import MenuTriggerButton from "./MenuTriggerButton";
import ProgressBarLoadingOverlay from "./widgets/ProgressBarLoadingOverlay";
import Designer from "./layouts/Designer";
import { GroupItem, GroupIcon } from "./layouts/LayoutStyled";
import { createPortal } from "react-dom";
import useStore from "../Store";
import { T } from "../Helpers";
import Footer from "./layouts/Footer";
import FooterMobile from "./layouts/FooterMobile";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

const dialogsPortal = document.getElementById("dialogs-portal")!;
// const Container = styled.div`
// overflow: auto;
// width: 100%;
// ${!selectedTrayPreviewOpenButton
//     ? css`
//         height: 230px;
//       `
//     : css`
//         height: 70px;
//       `}
// `;

interface TrayPreviewOpenButton3DProps {
  trayPreviewOpenButton3DFunc: (data: any) => void;
}

const Selector: FunctionComponent<TrayPreviewOpenButton3DProps> = ({
  trayPreviewOpenButton3DFunc,
}) => {
  const {
    isSceneLoading,
    loadComposition,
    isAddToCartLoading,
    price,
    groups,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
    productName,
    zoomIn,
    zoomOut,
    getPDF,
    items,
    product,
    setItemText,
    defaultColor,
    fonts,
    addItemText,
  } = useZakeke();

  const { setIsLoading, isMobile } = useStore();

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);

  const [selectedColorName, selectColorName] = useState<any | null>(null);

  // Get a list of all group names so we can populate on the tray
  const [selectedGroupList, selectGroupList] = useState<any | null>(null);

  // Open tray for menu
  const [isTrayOpen, setIsTrayOpen] = useState<any | null>(false);

  // Get the id of the selected group from the tray
  const [selectedGroupIdFromTray, selectGroupIdFromTray] = useState<
    number | null
  >(null);

  // Update tray preview open button
  const [selectedTrayPreviewOpenButton, selectTrayPreviewOpenButton] =
    useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );

  // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  //console.log(groups,'for checking others');

  let indexToRemove = groups.findIndex((obj) => obj.id === -1);

  if (indexToRemove !== -1) {
    groups.splice(indexToRemove, 1);
  }

  const dialogsPortal = document.getElementById("dialogs-portal");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      //   setHeight(window.innerHeight);
    };

    //window.addEventListener('resize', handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups.length > 0) {
      // console.log("items", items, "groups", groups, "product", product);

      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (groups.length > 0) {
      var groupRec: string[] = [];
      groups.map((group) => {
        groupRec.push(group.name);
      });
      selectGroupList(groupRec);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);

  // useEffect(() => {
  // 	const textItems = items.filter((item) => item.type === 0) // as TextItem[];
  // 	//const newItems = textItems.filter((item) => !prevItems.some((prevItem) => prevItem.guid === item.guid));
  // 	// newItems.forEach((item) => {
  // 	// 	if (item.isTemplateElement) setItemText(item.guid, T._d(item.text));
  // 	// });
  // 	// setPrevItems(textItems);

  //   textItems.map((item) => {
  //     setItemText(item.guid,'first tezzt')
  //   })

  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [items]);

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

      //     console.log(items[0]?.guid,groups);

      //     // push text into zakeke component
      //   const item  = {
      //     // guid: items[0]?.guid,
      //     text: 'heheheheheheh',
      //     // text: T._("Text", "Composer"),
      //     // fillColor: defaultColor,
      //     fontFamily: fonts[0].name,
      //     // fontSize: 48,
      //     // fontWeight: 'normal normal',
      //     // isTextOnPath: false,
      //     // constraints: null,
      // }

      //    addItemText(item, 345656)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId]);

  if (isSceneLoading || !groups || groups.length === 0)
    return (
      <PreviewContainer>
        <BlurOverlay>
          {/* <span>Loading scene...</span>; */}
          <ProgressBarLoadingOverlay />
        </BlurOverlay>
      </PreviewContainer>
    );

  // groups
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  const handleLeftClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);
  };

  const handleRightClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex + 1) % groups.length);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);
  };

  const toggleTray = () => {
    if (selectedTrayPreviewOpenButton) {
      selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);
    }
    // trayPreviewOpenButton();
    setIsTrayOpen(!isTrayOpen);
  };

  const trayPreviewOpenButton = () => {
    selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);

    //trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
    trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
  };

  const groupIdFromFunc = (data: any) => {
    //console.log('ayyy',groups,data);
    const filteredArray = groups.filter((group) => group.name === data);
    // const filteredArrayId = groups.filter((group) => group.name === data);

    //  console.log(filteredArrayId, 'sddfasfdafdsf');

    const filteredArrayId = groups.filter((i: any, index: number) => {
      // Perform the desired comparison
      return i.name === data;
    });

    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemId = foundItem.id;
      const foundItemIndex = groups.indexOf(foundItem);
      // console.log("Found ID:", foundItemId);
      // console.log("Found Index:", foundItemIndex);
      setCurrentIndex(foundItemIndex);
    }

    selectGroup(filteredArray[0].id);
    selectGroupIdFromTray(filteredArray[0].id);
  };

  // Styling for height: 230px;
  // const Container = styled.div`
  //   overflow: auto;
  //   width: 100%;
  //   ${!selectedTrayPreviewOpenButton
  //   ? css`
  //       height: 230px;
  //     `
  //   : css`
  //       height: 70px;
  //     `}
  // `;

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  const containerStyles = {
    overflow: "auto",
    width: "100%",
    height: !selectedTrayPreviewOpenButton ? "13rem" : "70px",
  };

  return (
    <>
      <div className="top-nav">
        <div className="body-3" id="product-info">
          <span>{productName}</span>
          <span>LEI {price}</span>
        </div>
      </div>

      {!isMobile && !isTrayOpen ? (
        <div style={{ position: "absolute", top: "36%", bottom: "45%" }}>
          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomInIcon-sc-1nws045-19 gIdUDj dgqSKi"
            onClick={zoomIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 18 9 L 18 12 L 15 12 L 15 14 L 18 14 L 18 17 L 20 17 L 20 14 L 23 14 L 23 12 L 20 12 L 20 9 Z"></path>
            </svg>
          </div>

          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomOutIcon-sc-1nws045-20 gIdUDj gwevdV"
            onClick={zoomOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 15 12 L 15 14 L 23 14 L 23 12 Z"></path>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}

      {isMobile && !isTrayOpen ? (
        <div style={{ position: "absolute", top: "30%" }}>
          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomInIcon-sc-1nws045-19 gIdUDj dgqSKi"
            onClick={zoomIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 18 9 L 18 12 L 15 12 L 15 14 L 18 14 L 18 17 L 20 17 L 20 14 L 23 14 L 23 12 L 20 12 L 20 9 Z"></path>
            </svg>
          </div>

          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomOutIcon-sc-1nws045-20 gIdUDj gwevdV"
            onClick={zoomOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 15 12 L 15 14 L 23 14 L 23 12 Z"></path>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <GroupItem   */}

      {/* Personalize A */}
      {!isMobile && (
        <div
          className="iHdtWA group-item selected"
          style={{
            position: "absolute",
            top: "5%",
            right: "1%",
            cursor: "pointer",
            marginLeft: "20px",
            width: "30vw",
          }}
        >
          <div
            className="button-53"
            onClick={() => setSelectedPersonalize(!selectedPersonalize)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px",
              }}
            >
              {T._("Personalizeaza", "Composer")}
            </span>
          </div>
          {selectedPersonalize ? (
            <Designer togglePersonalize={togglePersonalize} />
          ) : (
            ""
          )}
        </div>
      )}

      <div className="animate-wrapper-0">
        {/* Personalize A */}
        {isMobile && (
          <div
            className="LayoutStyled__GroupItem-sc-1nws045-2"
            style={{
              position: "absolute",
              top: "3%",
              right: "31%",
              cursor: "pointer",
            }}
          >
            <div
              className="button-53"
              onClick={() => setSelectedPersonalize(!selectedPersonalize)}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "7px 5px",
                }}
              >
                {T._("Personalizeaza", "Composer")}
              </span>             
            </div>


            <div
              className="LayoutStyled__GroupItem-sc-1nws045-2"
              style={{
                position: "absolute",
                top: "-25%",
                left: "10.2em",
                cursor: "pointer",
                width: "70px",
                height: "51px",
              }}
            >
             {isMobile && <FooterMobile />}
            </div>

            <div
              className="LayoutStyled__GroupItem-sc-1nws045-2"
              style={{
                position: "absolute",
                top: "-42%",
                left: "11.2em",
                cursor: "pointer",
                width: "70px",
                height: "51px",
              }}
            >
             {!isMobile && <Footer />}
            </div>

            {selectedPersonalize ? (
              <Designer togglePersonalize={togglePersonalize} />
            ) : (
              ""
            )}
          </div>
        )}

        <div style={containerStyles}>
          <div className="tray-header">
            <TrayPreviewOpenButton
              width={width}
              trayPreviewOpenButton={trayPreviewOpenButton}
              selectedTrayPreviewOpenButton={selectedTrayPreviewOpenButton}
              selectTrayPreviewOpenButton={selectTrayPreviewOpenButton}
            />

            <div
              style={{
                display: "flex",
                width: "420px",
                top: "50%",
                left: "50%",
                height: "auto",
                margin: "0px auto",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="previous-customization"
                onClick={handleLeftClick}
              >
                <div className="mc-prev">
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
                </div>
              </button>

              <div className="tray-header-1">
                <div
                  style={{
                    position: "absolute",
                    padding: "0px",
                    width: "100%",
                  }}
                >
                  <div className="active-marketing-component-name">
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                      }}
                    >
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
            {!isMobile && <Footer />}

            {/* Closed on request of Paul */}
            {/* <MenuTriggerButton width={width} toggleTray={toggleTray} /> */}
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
            {isTrayOpen && !selectedTrayPreviewOpenButton && (
              <Tray
                groupNameList={selectedGroupList}
                toggleFunc={toggleTray}
                UpdateGroupId={groupIdFromFunc}
              />
            )}
            {selectedGroup &&
              !selectedTrayPreviewOpenButton &&
              selectedGroup.steps.length > 0 &&
              !isTrayOpen && (
                <List>
                  {selectedGroup.steps.map((step) => {
                    return (
                      <ListItem
                        key={step.id}
                        onClick={() => selectStep(step.id)}
                        selected={selectedStep === step}
                      >
                        {step.name}
                      </ListItem>
                    );
                  })}
                </List>
              )}

            {!selectedTrayPreviewOpenButton && (
              <div style={{ width: "100%" }}>
                <List>
                  {attributes &&
                    !isTrayOpen &&
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

                {width > 400 &&
                  <List>
                  {!selectedTrayPreviewOpenButton &&
                    selectedAttribute &&
                    !isTrayOpen &&
                    selectedAttribute.options.map((option) => {
                      return (
                        <ListItemColor
                          key={option.id}
                          onClick={() => selectOption(option.id)}
                          selected={option.selected}
                          selectedColor={selectedColorName}
                        >
                          {option.imageUrl && (
                            <ListItemImageNoCarousel
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
                }           


                {/* NUKA CAROUSEL WHICH IS GREATER THAN 16 slides FOR mobile phone */}

                {selectedAttribute &&
                  // selectedAttribute.options.length >= 19 &&
                  width <= 400 && (
                    <div
                      className="mobileCarousel"
                      style={{
                        backgroundColor: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                        height: "8.5vh",
                        width: "90vw",
                        paddingLeft: "3em",
                      }}
                    >
                      <List>
                        {!selectedTrayPreviewOpenButton &&
                          selectedAttribute &&
                          !isTrayOpen && (
                            <Swiper
                              spaceBetween={1}
                              slidesPerView={1}
                              navigation={true}
                              modules={[Navigation]}
                              //onSlideChange={() => console.log('slide change')}
                              //onSwiper={(swiper) => console.log(swiper)}
                            >
                              {selectedAttribute.options.map((option) => (
                                <>
                                  <SwiperSlide>
                                    <ListItemColorWithCarousel
                                      key={option.id}
                                      onClick={() => {
                                        selectOption(option.id);
                                      }}
                                      selected={option.selected}
                                      selectedColor={selectedColorName}
                                    >
                                      {option.imageUrl && (
                                        <ListItemImage
                                          src={option.imageUrl}
                                          onClick={() =>
                                            selectColorName(option.name)
                                          }
                                          selected={option.selected}
                                        />
                                      )}
                                    </ListItemColorWithCarousel>
                                  </SwiperSlide>
                                </>
                              ))}
                            </Swiper>
                          )}
                        {/* {selectedColorName}   */}
                      </List>
                    </div>
                  )}


                                               
                                        
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
