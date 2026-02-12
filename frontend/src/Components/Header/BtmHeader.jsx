import React from "react";

import NaV from "../HeaderComponents/NaV";
import SignBtn from "../HeaderComponents/SignBtn";
import DarkToggle from "../DarkToggle/DarkToggle";

function BtmHeader() {
  return (
    <div className="BtmHeader max-md:hidden py-2 bg-(--gray-color) dark:bg-(--dark-secondary-color)">
      <div className="container flex justify-between items-center">
        
        <NaV />
        <SignBtn />
      </div>
    </div>
  );
}

export default BtmHeader;
