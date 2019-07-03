import React from "react";
import { connect } from "react-redux";
import BingoCount from "../Components/BingoCount";
import * as Actions from "../Reducers";

export default connect(
  null,
  dispatch => ({
    endGame: () => dispatch(Actions.endGame()),
  }),
)(BingoCount);
