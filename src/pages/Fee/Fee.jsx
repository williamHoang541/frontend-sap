import React from "react";
import "./Fee.css";
import { SlArrowRight } from "react-icons/sl";

const Fee = () => {
  return (
    <div className="fee">
      <div className="fee_title_container">
        <div className="fee_title_left">
          <div className="fee_title">Fees Collection</div>
        </div>
        <div className="fee_fee_right">
          <div className="fee_fee">Fee</div>
          <SlArrowRight className="fee_icon_right" />
          <div className="fee_collection">Fees Collection</div>
        </div>
      </div>
    </div>
  );
};

export default Fee;
