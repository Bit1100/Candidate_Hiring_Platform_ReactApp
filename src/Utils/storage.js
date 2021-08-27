export const getCandidate = () => {
  const candidates = window.localStorage.getItem("selected");
  return JSON.parse(candidates);
};

export const setCandidate = (selected) => {
  window.localStorage.setItem("selected", JSON.stringify(selected));
};
