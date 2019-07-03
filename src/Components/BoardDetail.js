import React from "react";
import PropTypes from "prop-types";

import styled from "./BoardDetail.css";

const BoardDetail = props => {
  const { num, isClicked, turn, turnCheckHandler, player, onClickList } = props;

  const onClickHandler = () => {
    if (isClicked) {
      alert("이미 누르신 숫자입니다.");
      return;
    }
    if (player === turn) {
      onClickList(num);
      turnCheckHandler();
    } else {
      alert("잘못된 차례입니다.");
    }
  };

  return (
    <div
      className={isClicked ? styled.item2 : styled.item1}
      onClick={() => onClickHandler()}
    >
      {num}
    </div>
  );
};

BoardDetail.propTypes = {
  num: PropTypes.number.isRequired,
  isClicked: PropTypes.bool.isRequired,
  player: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  turnCheckHandler: PropTypes.func.isRequired,
  onClickList: PropTypes.func.isRequired,
};
export default BoardDetail;
