import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import * as Actions from "../Reducers";

import styled from "./BoardDetail.css";

const BoardDetail = props => {
  const {
    num,
    isClicked,
    idx,
    isClickHandler,
    turn,
    turnCheckHandler,
    player,
  } = props;

  const clickHandler = () => {
    if (player === turn) {
      isClickHandler(idx);
      turnCheckHandler();
      return;
    }
    alert("당신 차례가 아닙니다.");
  };

  return (
    <div
      className={isClicked ? styled.item2 : styled.item1}
      onClick={() => clickHandler(idx)}
    >
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
  isClickHandler: propTypes.func.isRequired,
  player: propTypes.number.isRequired,
  turn: propTypes.number.isRequired,
  turnCheckHandler: propTypes.func.isRequired,
};

export default connect(
  state => ({
    turn: state.get("turn"),
  }),
  dispatch => ({
    turnCheckHandler: () => dispatch(Actions.playerTurn()),
  }),
)(BoardDetail);
