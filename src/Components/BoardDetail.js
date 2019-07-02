import React from "react";
import propTypes from "prop-types";

const BoardDetail = ({ num, isClicked, idx }) => {
  return (
    <div style={{ border: "1px solid", width: "19.5%", height: "19.6%" }}>
      {num}
    </div>
  );
};

BoardDetail.defaultProps = {
  num: 1,
  isClicked: false,
  idx: 1,
};

BoardDetail.propTypes = {
  num: propTypes.number,
  isClicked: propTypes.bool,
  idx: propTypes.number,
};
export default BoardDetail;
