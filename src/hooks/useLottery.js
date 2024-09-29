import { useState, useEffect } from 'react';

const initialState = {
  no1: '',
  no2: '',
  no3: '',
  no4: '',
  no5: '',
  no6: '',
};

export function useLottery() {
  const [userPick, setUserPick] = useState(initialState);
  const [result, setResult] = useState();

  return [userPick, result];
}
