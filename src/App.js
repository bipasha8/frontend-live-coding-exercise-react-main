import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";
import Button from './Button';


const App = () => {
  const [res, setRes] = useState({})
  const [totalRes, setTotalRes] = useState(0)
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    calculateAvgRating();
  }, []);

  const handleQuesRes = (index, response) => {
    setRes((prevRes) => ({
      ...prevRes,
      [index]: response === 'Yes',
    }));
  };

  const calculateScore = () => {
    const countOfYes = Object.values(res).filter((response) => response).length;
    return countOfYes / Object.keys(QUESTIONS).length * 100;
  };

  const calculateAvgRating = () => {
    const storedResponses = JSON.parse(localStorage.getItem('res')) || {};
    const scores = Object.values(storedResponses).map(({ score }) => score);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    setTotalRes(totalScore / scores.length || 0);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const storedResponses = JSON.parse(localStorage.getItem('res')) || {};
    const newResponse = { responses: res, score };
    localStorage.setItem('res', JSON.stringify({ ...storedResponses, [Date.now()]: newResponse }));
    calculateAvgRating();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    setRes({});
  };


  return (
    <div className="main__wrap">
      <main className="container">
      <h3 className="header">Answer the following questions in yes or no:</h3>
        <div>
          <ol>
            {Object.entries(QUESTIONS).map(([index, question]) => (
              <li key={index}>
                <p>{question}</p>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="Yes"
                    onChange={() => handleQuesRes(index, 'Yes')}
                    checked={res[index] === true}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="No"
                    onChange={() => handleQuesRes(index, 'No')}
                    checked={res[index] === false}
                  />
                  No
                </label>
              </li>
            ))}
          </ol>

          <Button onClick={handleSubmit}>Submit</Button>
          {showToast && <p className="toast">Submit successful!</p>}
          <p>Total Score: {calculateScore()}</p>
          <p className="avg-score">Average Rating: {totalRes.toFixed(2)}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
