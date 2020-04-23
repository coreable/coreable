import React, { useState } from "react";
import "./DrawerToggleButton.css";
<<<<<<< HEAD
import SideDrawerV2 from "./SideDrawerV2";
=======
>>>>>>> 3fec2834515b799496fab1b91ae14d5633dce7b0

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

  if (menuOpen) {
    return (
      <React.Fragment>
        <div className={`toggle-button${open}`} onClick={menuToggleHandler}>
          <div className="toggle-button-line" />
        </div>
        {/* sidedrawer code here */}
        <SideDrawerV2 menuOpen={menuOpen} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className={`toggle-button${open}`} onClick={menuToggleHandler}>
          <div className="toggle-button-line" />
        </div>
        <SideDrawerV2 menuOpen={menuOpen} />
      </React.Fragment>
    );
  }
};

export default DrawerToggleButton;
