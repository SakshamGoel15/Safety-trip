import React from "react";
import { Colors } from "../map/PathColors";
import "./DropdownMenu.css";

interface dropdownProps {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const DropdownMenu = (props: dropdownProps) => {
  return (
    <div className="dropdown">
      <div className="dropdown-selected-item">
        <span
          className="color-splash"
          style={{
            backgroundColor: Colors[props.selectedIndex % Colors.length],
          }}
        />
        {props.items[props.selectedIndex]} ▾
      </div>
      <div className="dropdown-content">
        {props.items.map((e, i) => (
          <div
            className="dropdown-item"
            key={i}
            onClick={() => props.setSelectedIndex(i)}
          >
            <span
              className="color-splash"
              style={{ backgroundColor: Colors[i % Colors.length] }}
            />
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DropdownMenu);
