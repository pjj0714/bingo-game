import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";

const START_GAME = "bingo/START_GAME";
const END_GAME = "bingo/END_GAME";
const PLAYER_TURN = "bingo/PLAYER_TURN";

export const startGame = createAction(START_GAME);
export const endGame = createAction(END_GAME);
export const playerTurn = createAction(PLAYER_TURN);

const initialState = Map({
  start: false,
  reStart: false,
  turn: 1,
});

export default handleActions(
  {
    [START_GAME]: state => {
      const restartGame = state.get("reStart");
      return state
        .set("start", true)
        .set("reStart", !restartGame)
        .set("player", 1);
    },
    [END_GAME]: state => {
      return state.set("start", false).set("player", 1);
    },
    [PLAYER_TURN]: state => {
      const turn = state.get("turn");
      return turn < 2
        ? state.set("turn", turn + 1)
        : state.set("turn", turn - 1);
    },
  },
  initialState,
);
