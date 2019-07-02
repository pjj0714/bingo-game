import React from "react";
import propTypes from "prop-types";
import BoardDetail from "./BoardDetail";
import getRandomList from "../utils";

import styled from "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const randomList = getRandomList();
    this.setState({ list: randomList });
  }

  componentDidUpdate(preProps) {
    const randomList = getRandomList();
    const { reStart, clickList } = this.props;
    const { list } = this.state;

    if (preProps.reStart !== reStart) {
      this.setState({ list: randomList });
    }

    if (preProps.clickList.length !== clickList.length) {
      const a = list.map(el => ({
        num: el.num,
        isClicked: clickList.includes(el.num),
      }));

      this.setState({
        list: a,
      });
    }
  }

  rowBingoCheck() {
    const { list } = this.state;
    if (list.length === 0) return 0;

    let [rowBingo, bingoCheck] = [0, true];

    for (let i = 0; i < list.length; i += 1) {
      const clickCheck = list[i].isClicked;
      if (!clickCheck) {
        bingoCheck = false;
      }
      if (i % 5 === 4) {
        if (bingoCheck) {
          rowBingo += 1;
        }
        bingoCheck = true;
      }
    }

    return rowBingo;
  }

  colBingoCheck() {
    const { list } = this.state;
    if (list.length === 0) return 0;
    let bingo = 0;
    let bingoCheck;
    for (let i = 0; i < 5; i += 1) {
      const clickCheck = list[i].isClicked;
      if (clickCheck) {
        let temp = 0;
        let idx = i;
        bingoCheck = true;
        while (temp < 4) {
          console.log(1);
          idx += 5;
          if (!list[idx].isClicked) {
            bingoCheck = false;
            break;
          }
          temp += 1;
        }

        if (bingoCheck) bingo += 1;
      }
    }

    return bingo;
  }

  diagonalBingoCheck(num) {
    const { list } = this.state;
    if (list.length === 0) return 0;
    const j = num || 6;
    let [bingo, i, bingoCheck] = [0, 1, true];

    while (i <= 5 && j * i < 30) {
      const clickCheck = list[j * i].isClicked;
      if (!clickCheck) {
        bingoCheck = false;
        break;
      }
      i += 1;
    }
    if (bingoCheck) {
      bingo += 1;
    }

    return bingo;
  }

  makeBingoCount() {
    const row = this.rowBingoCheck();
    const col = this.colBingoCheck();
    const diagonal = this.diagonalBingoCheck() + this.diagonalBingoCheck(4);
    const total = row + col + diagonal;
    return { row, col, diagonal, total };
  }

  render() {
    const { list } = this.state;
    const { start, player } = this.props;
    const bingoCount = this.makeBingoCount();
    const renderList = list.map((el, idx) => {
      return (
        <BoardDetail
          key={idx}
          num={el.num}
          isClicked={el.isClicked}
          player={player}
          total={bingoCount.total}
        />
      );
    });

    return (
      <div>
        <div>{`Player : ${player}P`}</div>
        <div className={styled.container}>{start ? renderList : ""}</div>
        <div>열 빙고 : {bingoCount.row}</div>
        <div>행 빙고 : {bingoCount.col}</div>
        <div>대각선 빙고 : {bingoCount.diagonal}</div>
        <div>합계 : {bingoCount.total}</div>
      </div>
    );
  }
}

Board.defaultProps = {
  start: false,
  reStart: false,
};
Board.propTypes = {
  start: propTypes.bool,
  reStart: propTypes.bool,
  player: propTypes.number.isRequired,
  clickList: propTypes.arrayOf(propTypes.number).isRequired,
};

export default Board;
