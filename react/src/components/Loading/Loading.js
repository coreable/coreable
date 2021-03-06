import React from "react";
import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loader">
      <div className="inside-loader">
        <h1>Loading</h1>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
