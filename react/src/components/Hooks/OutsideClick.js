import React, { useRef, useEffect, useState } from "react";

const OutsideClick = (initialValue) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialValue);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return { visible, setVisible, ref };
};

export default OutsideClick;
