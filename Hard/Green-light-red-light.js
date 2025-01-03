import React, { useState, useEffect } from "react";
import styled from "styled-components";

function GreenLightRedLight() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [boxColor, setBoxColor] = useState("red");

  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameFinished(true);
    }
  }, [gameStarted, gameFinished, timeLeft]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoxColor(boxColor === 'red' ? 'green' : 'red');
    }, Math.floor(Math.random() * 1000) + 1000)

    return () => clearInterval(intervalId);
  }, [boxColor])

  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(15);
    setGameFinished(false);
  };

  const handleBoxClick = () => {
    if (boxColor === 'green' && score === 14) {
      setScore(score + 1);
      setGameFinished(true);
    } else if (boxColor === "green") {
      setScore(score + 1);
    } else {
      setGameFinished(true);
    }
  };

  return (
    <Wrapper>
      {(!gameStarted || gameFinished) && <Button onClick={handleStartGame}>Start Game</Button>}
      {gameStarted && !gameFinished && <Timer>Time left: {timeLeft}s {gameFinished && " - Game Over!"}</Timer>}
      <Scoreboard>Score: {score}</Scoreboard>
      {gameStarted && !gameFinished && <Box onClick={handleBoxClick} color={boxColor}></Box>}
      {gameFinished && <Outcome>{score < 15 ? 'Game Over!' : 'You win!'}</Outcome>}
    </Wrapper>
  );
}

export default GreenLightRedLight

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Scoreboard = styled.h1`
  font-size: 36px;
`

const Outcome = styled.h2`
  font-size: 28px;
`

const Timer = styled.p`
  font-size: 24px;
  margin-bottom: 36px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 28px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`