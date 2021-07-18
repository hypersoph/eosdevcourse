import { ActionTypes } from 'const';

const initialState = {
    name: "",
    win_count: 0,
    lost_count: 0,
    game: null,
};

// Reducer handles our actions to update our Redux store
export default function (state = initialState, action) {
    switch (action.type) {
      case ActionTypes.SET_USER: {
        return Object.assign({}, state, {
          // If the name is not specified, do not change it
          // The places that will change the name is login
          // In that cases, the `win_count`, `lost_count`, `game` will be reset
          name: typeof action.name === "undefined" ? state.name : action.name,
          win_count: action.win_count || initialState.win_count, // if action provides a win_count, update the state to the new count, etc.
          lost_count: action.lost_count || initialState.lost_count,
          game: action.game || initialState.game, // update game metadata if provided as well
        });
      }
      default:
        return state;
    }
  }
  