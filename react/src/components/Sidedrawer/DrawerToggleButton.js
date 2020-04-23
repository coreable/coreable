import React, { useState } from "react";
import "./DrawerToggleButton.css";

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
      </React.Fragment>
    );
  } else {
    return (
      <div className={`toggle-button${open}`} onClick={menuToggleHandler}>
        <div className="toggle-button-line" />
      </div>
    );
  }
};

export default DrawerToggleButton;
