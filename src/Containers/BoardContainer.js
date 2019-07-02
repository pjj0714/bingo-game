import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line import/no-named-as-default
import Board from "../Components/Board";

const mapStateToProps = state => ({
  start: state.get("start"),
  reStart: state.get("reStart"),
});

export default connect(mapStateToProps)(Board);
