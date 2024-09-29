import { useState } from 'react';
import 'xp.css/dist/XP.css';
import { getRandomNumbers, randomBonusNumber, compareNumbers, determinePrizeGroup } from './utils';
import './styles/app.css';

const initialState = {
  no1: '',
  no2: '',
  no3: '',
  no4: '',
  no5: '',
  no6: '',
};

const winningNumber = getRandomNumbers();
const getRandNumber = randomBonusNumber(winningNumber);

export default function App() {
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

  return (
    <div className="container">
      <div className="window" style={{ width: 600 }}>
        <div className="title-bar">
          <div className="title-bar-text">
            <h1 className="title-bar__heading">Singapore Toto Lottery Simulator</h1>
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" aria-hidden="true"></button>
            <button aria-label="Maximize" aria-hidden="true"></button>
            <button aria-label="Close" onClick={_resetForm}></button>
          </div>
        </div>
        <div className="window-body">
          <p>Pick 6 numbers from 1 to 49 only</p>
          <form onSubmit={_handleSubmitToto} className="form-container">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="col-auto" key={`inputNumber${index + 1}`}>
                <label htmlFor={`inputNumber${index + 1}`} className="visually-hidden">
                  Enter your number
                </label>
                <input
                  type="text"
                  id={`inputNumber${index + 1}`}
                  className="form-control"
                  maxLength={2}
                  name={`no${index + 1}`}
                  autoComplete="off"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={_handleInputPickNumber}
                  value={userPick[`no${index + 1}`]}
                />
              </div>
            ))}
            <section className="field-row" style={{ justifyContent: 'flex-end' }}>
              <button type="submit">OK</button>
              <button type="button" onClick={_resetForm}>
                Cancel
              </button>
            </section>
          </form>
        </div>
      </div>
      {result && (
        <>
          <div className="window" style={{ width: 600 }}>
            <div className="title-bar">
              <div className="title-bar-text">
                <h1 className="title-bar__heading">Singapore Toto Lottery Simulator: Result</h1>
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" aria-hidden="true" onClick={_resetForm}></button>
              </div>
            </div>
            <div className="window-body">
              <p>
                The winning number are {winningNumber.join(', ')} and a bonus number is {getRandNumber}
              </p>
              <p>{result.matchingCount >= 3 ? 'Congratulation, You won a prize' : "Sorry, you didn't win any prize."}</p>
              <p>{determinePrizeGroup(result.matchingCount, result.hasBonusNumber)}</p>
              <section className="field-row" style={{ justifyContent: 'flex-end' }}>
                <button onClick={_resetForm}>OK</button>
              </section>
            </div>
          </div>
          <div className="window" style={{ width: 800 }}>
            <div className="title-bar">
              <div className="title-bar-text">Command Prompt</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" aria-hidden="true"></button>
                <button aria-label="Maximize" aria-hidden="true"></button>
                <button aria-label="Close" onClick={_resetForm}></button>
              </div>
            </div>
            <div className="window-body">
              <pre>Debug&gt; {JSON.stringify(result)}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
