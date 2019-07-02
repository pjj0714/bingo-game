import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";

const START_GAME = "bingo/START_GAME";
const END_GAME = "bingo/END_GAME";

export const startGame = createAction(START_GAME);
export const endGame = createAction(END_GAME);

const initialState = Map({
  start: false,
  reStart: false,
});

export default handleActions(
  {
    [START_GAME]: (state, action) => {
      const restartGame = state.get("restart");
      return state.set("start", true).set("reStart", !restartGame);
    },
    [END_GAME]: (state, action) => {
      return state.set("start", false);
    },
  },
  initialState,
);
