import React from "react";
import { connect } from "react-redux";
import Board from "../Components/Board";

const mapStartToProps = state => ({
  start: state.get("start"),
  reStart: state.get("reStart"),
});

export default connect(
  mapStartToProps,
  null,
)(Board);
