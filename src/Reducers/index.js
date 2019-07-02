import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

const START_GAME = "bingo/START_GAME";
const END_GAME = "bingo/END_GAME";
const PLAYER_TURN = "bingo/PLAYER_TURN";
const CLICK = "bingo/CLICK";

export const startGame = createAction(START_GAME);
export const endGame = createAction(END_GAME);
export const playerTurn = createAction(PLAYER_TURN);
export const click = createAction(CLICK);

const initialState = Map({
  start: false,
  reStart: false,
  turn: 1,
  clickList: List([]),
});

export default handleActions(
  {
    [START_GAME]: state => {
      const restartGame = state.get("reStart");
      return state
        .set("start", true)
        .set("reStart", !restartGame)
        .set("turn", 1)
        .set("clickList", List([]));
    },
    [END_GAME]: state => {
      return state.set("start", false).set("turn", 1);
    },
    [PLAYER_TURN]: state => {
      const turn = state.get("turn");
      return turn < 2
        ? state.set("turn", turn + 1)
        : state.set("turn", turn - 1);
    },
    [CLICK]: (state, action) => {
      const clickList = state.get("clickList");
      return state.set("clickList", clickList.push(action.payload));
    },
  },
  initialState,
);
