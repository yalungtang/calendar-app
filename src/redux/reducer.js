import { combineReducers } from "redux";

const initialState = {};

function remindersReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "reminders/add": {
      const { id, value } = payload;
      return {
        ...state,
        [id]: state[id] ? [...state[id], value] : [value],
      };
    }
    case "reminders/edit": {
      const { id, value, oldId } = payload;

      const result = {
        ...state,
        [oldId]: [...state[oldId].filter((r) => r.uid !== value.uid)],
      };

      return {
        ...result,
        [id]: result[id] ? [...result[id], value] : [value],
      };
    }
    case "reminders/delete": {
      const { id, value } = payload;
      const result = {
        ...state,
        [id]: [...state[id].filter((r) => r.uid !== value.uid)],
      };
      return {
        ...result,
      };
    }
    default:
      return state;
  }
}
function viewReducer(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case "view/add": {
      return { view: 'add' };
    }
    case "view/edit": {
      return { view: 'edit', values: payload };
    }
    case "view/reset": {
      return null;
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reminders: remindersReducer,
  view: viewReducer,
});

export default rootReducer;
