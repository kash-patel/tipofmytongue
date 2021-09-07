import { CREATE_QUERY, UPDATE_QUERY, DELETE_QUERY } from "./constants";

export const createQuery = (rel, word) => {
  return {
    type: CREATE_QUERY,
    payload: { rel, word },
  };
};

export const updateQuery = (id, rel, word) => {
  return {
    type: UPDATE_QUERY,
    payload: { id, rel, word },
  };
};

export const deleteQuery = (id) => {
  return {
    type: DELETE_QUERY,
    payload: id,
  };
};
