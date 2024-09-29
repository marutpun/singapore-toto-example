import { useState } from 'react';
import { getRandomNumbers, randomBonusNumber, compareNumbers } from '../utils';

const initialState = {
  no1: '',
  no2: '',
  no3: '',
  no4: '',
  no5: '',
  no6: '',
};

export const winningNumber = getRandomNumbers();
export const getRandNumber = randomBonusNumber(winningNumber);

export default function useLottery() {
  const [userPick, setUserPick] = useState(initialState);
  const [result, setResult] = useState();

  const _handleSubmitToto = (e) => {
    e.preventDefault();

    const resultsObj = compareNumbers(Object.values(userPick), winningNumber, getRandNumber);
    setResult(resultsObj);
  };

  const _handleInputPickNumber = (event) => {
    const minPickNumber = 1;
    const maxPickNumber = 49;

    const { target } = event;
    const value = target.value; // Keep the string value to allow empty input

    // Allow empty string or valid numbers
    const numericValue = value === '' ? '' : Number(value);

    if (value === '' || (numericValue >= minPickNumber && numericValue <= maxPickNumber)) {
      setUserPick({ ...userPick, [target.name]: numericValue });
    } else {
      console.warn(`Please enter a number between ${minPickNumber} and ${maxPickNumber}`);
    }
  };

  const _resetForm = () => {
    setUserPick(initialState);
    setResult(null);
  };

  return { userPick, setUserPick, result, setResult, _handleSubmitToto, _handleInputPickNumber, _resetForm };
}
