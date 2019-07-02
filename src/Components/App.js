import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Board from "./Board";
import * as Actions from "../Reducers";

const App = ({ start, startButtonHandler, endButtonHandler }) => {
  return (
    <div>
      <button type="button" onClick={startButtonHandler}>
        {start ? `게임 재시작하기` : `게임 시작하기`}
      </button>
      <button type="button" onClick={endButtonHandler}>
        게임 종료하기
      </button>
      <Board />
    </div>
  );
};

App.defaultProps = {
  start: false,
};

App.propTypes = {
  start: propTypes.bool,
  startButtonHandler: propTypes.func.isRequired,
  endButtonHandler: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  start: state.get("start"),
  reStart: state.get("reStart"),
});
const mapDispatchToProps = dispatch => ({
  startButtonHandler: () => dispatch(Actions.startGame()),
  endButtonHandler: () => dispatch(Actions.endGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
