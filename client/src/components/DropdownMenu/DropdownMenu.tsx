import React from "react";
import "./DropdownMenu.css";

interface dropdownProps {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: Function;
}

const DropdownMenu = (props: dropdownProps) => {
  return (
    <div className="dropdown">
      <div className="dropdown-selected-item">
        {props.items[props.selectedIndex]} ▾
      </div>
      <div className="dropdown-content">
        {props.items.map((e, i) => (
          <div
            className="dropdown-item"
            key={i}
            onClick={() => props.setSelectedIndex(i)}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DropdownMenu);
