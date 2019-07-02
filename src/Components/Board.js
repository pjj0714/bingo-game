import React from "react";
import propTypes from "prop-types";
import BoardDetail from "./BoardDetail";
import getRandomList from "../utils";

import styled from "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: new Array(25).fill(" "),
    };
  }

  componentDidMount() {
    const randomList = getRandomList();
    this.setState({ list: randomList });
  }

  componentDidUpdate(preProps) {
    const randomList = getRandomList();
    const { reStart } = this.props;
    if (preProps.reStart !== reStart) {
      this.setState({ list: randomList });
    }

    const bbbb = this.rowBingoCheck();
    const b = this.colBingoCheck();
    // const c = this.diagonalBingoCheck();
    // const d = this.diagonalBingoCheck(4);
    // console.log("row : ", a, "col : ", b, "주대각선 : ", c, "반대각선 : ", d);
    console.log(b);
  }

  isClickHandler(idx) {
    const { list } = this.state;
    const copyList = [...list];
    copyList[idx].isClicked = true;

    this.setState({
      list: copyList,
    });
  }

  diagonalBingoCheck(num) {
    const { list } = this.state;
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

  rowBingoCheck() {
    const { list } = this.state;
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

  // colBingoCheck() {
  //   const { list } = this.state;
  //   let bingo = 0;
  //   let bingoCheck;
  //   for (let i = 0; i < 5; i += 1) {
  //     const clickCheck = list[i].isClicked;
  //     if (clickCheck) {
  //       const temp = i % 5;
  //       bingoCheck = true;
  //       for (let j = 5; j < list.length; j += 1) {
  //         const secondClickCheck = list[j].isClicked;
  //         if (temp === j % 5 && !secondClickCheck) {
  //           bingoCheck = false;
  //           break;
  //         }
  //       }
  //       if (bingoCheck) bingo += 1;
  //     }
  //   }

  //   return bingo;
  // }

  colBingoCheck() {
    const { list } = this.state;
    let bingo = 0;
    let bingoCheck;
    for (let i = 0; i < 5; i += 1) {
      const clickCheck = list[i].isClicked;
      if (clickCheck) {
        let temp = 0;
        let idx = i;
        bingoCheck = true;
        while (temp < 4) {
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

  render() {
    const { list } = this.state;
    const { start, player } = this.props;
    const { isClickHandler } = this;
    const renderList = list.map((el, idx) => {
      return (
        <BoardDetail
          key={idx}
          num={el.num}
          isClicked={el.isClicked}
          idx={idx}
          player={player}
          isClickHandler={isClickHandler.bind(this)}
        />
      );
    });

    return (
      <div>
        <div>{`Player : ${player}P`}</div>
        <div className={styled.container}>{start ? renderList : ""}</div>
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
};

export default Board;
