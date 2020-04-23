import React from "react";
import DrawerToggleButton from "../Sidedrawer/DrawerToggleButton";
import "./Toolbar.scss";

const Toolbar = (props) => (
  <header className="toolbar-container">
    <nav className="toolbar-nav">
      <div className="toolbar-logo">
        {" "}
        <a href="/">Coreable</a>{" "}
      </div>
      <div className="spacer"></div>
      <div className="toolbar-toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      {/* <div className="toolbar-nav-items">
				<ul>
					<li> <a href="/">Account overview</a> </li>
					<li> <a href="/">Results</a> </li>
					<li> <a href="/">Results facets</a> </li>
					<li> <a href="/">History</a> </li>
					<li> <a href="/">Teams</a> </li>
					<li> <a href="/">Review</a> </li>
					<li> <a href="/">User settings</a> </li>
				</ul>
			</div> */}
    </nav>
  </header>
);

export { Toolbar };
