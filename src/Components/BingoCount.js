import React from "react";
import PropTypes from "prop-types";

const BingoCount = ({ row, col, dia, total, player, endGame }) => {
  if (total >= 5) {
    alert(`${player} Player 승리`);
    endGame();
  }

  return (
    <div>
      <div> 열 빙고 : {row} </div>
      <div>행 빙고 : {col}</div>
      <div>대각선 빙고 : {dia}</div>
      <div>빙고 합계 : {total}</div>
    </div>
  );
};

BingoCount.defaultProps = {
  row: 0,
  col: 0,
  dia: 0,
  total: 0,
};

BingoCount.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  dia: PropTypes.number,
  total: PropTypes.number,
  player: PropTypes.number.isRequired,
  endGame: PropTypes.func.isRequired,
};
export default BingoCount;
