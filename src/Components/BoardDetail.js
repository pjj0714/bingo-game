import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import * as Actions from "../Reducers";

import styled from "./BoardDetail.css";

const BoardDetail = props => {
  const {
    num,
    isClicked,
    turn,
    turnCheckHandler,
    player,
    onClickList,
    total,
  } = props;

  const clickHandler = () => {
    if (isClicked) {
      alert("이미 누르신 숫자입니다.");
      return;
    }
    if (player === turn) {
      onClickList(num);
      turnCheckHandler();
    } else {
      alert("당신 차례가 아닙니다.");
    }
  };

  return (
    <div
      className={isClicked ? styled.item2 : styled.item1}
      onClick={() => clickHandler()}
    >
      {num}
    </div>
  );
};

BoardDetail.defaultProps = {
  num: 1,
  isClicked: false,
};

BoardDetail.propTypes = {
  num: propTypes.number,
  isClicked: propTypes.bool,
  player: propTypes.number.isRequired,
  turn: propTypes.number.isRequired,
  turnCheckHandler: propTypes.func.isRequired,
  onClickList: propTypes.func.isRequired,
};

export default connect(
  state => ({
    turn: state.get("turn"),
    clickList: state.get("clickList").toJS(),
  }),
  dispatch => ({
    turnCheckHandler: () => dispatch(Actions.playerTurn()),
    onClickList: num => dispatch(Actions.click(num)),
  }),
)(BoardDetail);
