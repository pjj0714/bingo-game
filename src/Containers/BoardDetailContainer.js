import React from "react";
import { connect } from "react-redux";
import * as Actions from "../Reducers";
import BoardDetail from "../Components/BoardDetail";

const mapStateToProps = state => ({
  turn: state.get("turn"),
});

const mapDispatchToProps = dispatch => ({
  turnCheckHandler: () => dispatch(Actions.playerTurn()),
  onClickList: num => dispatch(Actions.click(num)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardDetail);
