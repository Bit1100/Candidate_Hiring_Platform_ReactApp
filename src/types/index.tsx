// For Slices and other files
export type candidateState = {
  id: number;
  name: string;
  phone: number;
  email: string;
  website: string;
};

export type candidatesDetailState = candidateState & {
  address: string;
  company: string;
};

export type candidatesState = {
  loading: boolean;
  candidates: candidateState[];
  error: string;
  candidate: candidatesDetailState;
};

// For SingleCandidate Component
export type singleCandidate = {
  key: number;
  candidate: candidateState;
  image: string;
};

// For Candidate Page
export type IdParam = { id: string };
