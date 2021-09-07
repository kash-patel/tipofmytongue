import {
  CREATE_QUERY,
  UPDATE_QUERY,
  DELETE_QUERY,
} from "../../actions/global/constants";

export const query = (state = { queries: [] }, action) => {
  switch (action.type) {
    case CREATE_QUERY:
      const id = `${action.payload.rel}/${action.payload.word}`;
      if (state.queries.find((query) => query.id === id)) return state;

      return {
        ...state,
        queries: [
          ...state.queries,
          { id, rel: action.payload.rel, word: action.payload.word },
        ],
      };
    case UPDATE_QUERY:
      const index = state.queries.findIndex(
        (query) => query.id === action.payload.id
      );

      if (
        index === -1 ||
        state.queries[index].id ===
          `${action.payload.rel}/${action.payload.word}`
      )
        return state;

      const queries = [...state.queries];

      queries[index] = {
        id: `${action.payload.rel}/${action.payload.word}`,
        rel: action.payload.rel,
        word: action.payload.word,
      };

      return {
        ...state,
        queries,
      };

    case DELETE_QUERY:
      return {
        ...state,
        queries: state.queries.filter((query) => query.id !== action.payload),
      };
    default:
      return state;
  }
};
