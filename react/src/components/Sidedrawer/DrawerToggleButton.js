import React, { useState } from "react";
import "./DrawerToggleButton.css";
import SideDrawerV2 from "./SideDrawerV2";

import Backdrop from "../Backdrop/Backdrop";

const DrawerToggleButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState("");

  const menuToggleHandler = () => {
    if (!menuOpen) {
      setOpen("-open");
      setMenuOpen(true);
    } else {
      setOpen("");
      setMenuOpen(false);
    }
  };

  const backdropClickHandler = () => {
    setMenuOpen(false);
  };

  const backDrop = () => {
    if (menuOpen) {
      const backDrop = <Backdrop click={backdropClickHandler} />;
      return backDrop;
    }
  };

  if (menuOpen) {
    return (
      <React.Fragment>
        <div className={`toggle-button${open}`} onClick={menuToggleHandler}>
          {/* <div className={`toggle-button${open}`} onClick={click}> */}
          <div className="toggle-button-line" />
        </div>
        {/* sidedrawer code here */}
        {backDrop()}
        <SideDrawerV2 menuOpen={menuOpen} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className={`toggle-button`} onClick={menuToggleHandler}>
          {/* <div className={`toggle-button${open}`} onClick={click}> */}
          <div className="toggle-button-line" />
        </div>
        {backDrop()}
        <SideDrawerV2 menuOpen={menuOpen} />
      </React.Fragment>
    );
  }
};

export default DrawerToggleButton;
