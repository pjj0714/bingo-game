import React from "react";
import propTypes from "prop-types";
import BoardDetail from "./BoardDetail";
import getRandomList from "../utils";

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

  render() {
    const { list } = this.state;
    const { start } = this.props;
    const renderList = list.map((el, idx) => {
      return (
        <BoardDetail
          key={idx}
          num={el.num}
          isClicked={el.isClicked}
          idx={idx}
        />
      );
    });

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {start ? renderList : ""}
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
};

export default Board;
