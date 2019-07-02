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
  }

  isClickHandler(idx) {
    const { list } = this.state;
    const copyList = [...list];
    copyList[idx].isClicked = true;

    this.setState({
      list: copyList,
    });
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
