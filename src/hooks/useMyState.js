import { useState } from 'react';

export const useMyState  = (initialState) => {
  const [state, setState] = useState(initialState);

  const resetState = () => setState(initialState);

  return { state, setState, resetState };
};
