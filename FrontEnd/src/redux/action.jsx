// actions.js
export const STORE_POT_ID = "STORE_POT_ID";

export const storePotID = (potID) => {
  return {
    type: STORE_POT_ID,
    payload: potID,
  };
};
