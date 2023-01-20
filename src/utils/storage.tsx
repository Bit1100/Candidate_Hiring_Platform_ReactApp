import { candidatesDetailState } from "../types";

export const getCandidate = (): candidatesDetailState[] => {
  const candidates = window.localStorage.getItem("selected") || "";
  return JSON.parse(candidates);
};

export const setCandidate = (selected: candidatesDetailState[]) => {
  window.localStorage.setItem("selected", JSON.stringify(selected));
};
