import React, { useState } from "react";
import "./Tray.css";

const Tray = ({ groupNameList, toggleFunc, UpdateGroupId }) => {
//  const [isOpen, setIsOpen] = useState(false);


const handleMultipleClicks = (event) => {
    //console.log(event.target.innerHTML);
    UpdateGroupId(event.target.innerHTML);
    toggleFunc();
  };

  return (
    <div
      className="full-tray"
      style={{ height: "504px", transformOrigin: "50% 50% 0px" }}
    >
      {/* <div className="tray-container"> */}
        <div className="tray-mc-header">
          {/* class="d-sm-flx flx-ai-sm-c flx-jc-sm-c css-154hl8z" */}
          <button className="tray-trigger-close-button" onClick={() => {console.log('aa');}}>
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
                d="M18.973 5.027L5.028 18.972M5.027 5.027l13.945 13.945"
              ></path>
            </svg>
          </button>
        </div>

        <div className="tray-mc-content">
          <div className="tray-mc-list-wrapper">
            {/* class="headline-3 css-4j0u2k" */}
            <h1 className="mc-list-title">
              COMPONENTS
              <span
                data-testid="mc-list-count"
                data-bm-component-id="mc-list-count"
              ></span>
            </h1>
            <div className="tray-mc-grid">
              {groupNameList.map((groupName, i) => {
                {
                  /* Grid headings */
                }
                return <div className="heading" id={i} onClick={handleMultipleClicks}>{groupName}</div>;
              })}
            </div>
          </div>
        </div>

    </div>
  );
};
export default Tray;
