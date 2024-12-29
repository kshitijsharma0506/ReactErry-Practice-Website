import React, { useRef, useState } from 'react';
import styled from 'styled-components';

function ReactionTest() {
  const [startTime, setStartTime] = useState(null);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false)
  const [message, setMessage] = useState(null)
  const timerRef = useRef(null);

  const startGame = () => {
    setMessage(null)
    setCountdownRunning(true)

    timerRef.current = setTimeout(() => {
      setCountdownRunning(false)
      setCountdownFinished(true);
      setStartTime(Date.now());
    }, Math.random() * 5000 + 1000);
  };

  const handleClick = () => {
    setMessage(`You took ${Date.now() - startTime}ms!`)
    setCountdownFinished(false);
    setStartTime(null);
  };

  const handleEarlyClick = () => {
    setMessage('You clicked too early!')
    setCountdownFinished(false);
    setCountdownRunning(false)
    setStartTime(null);
    clearTimeout(timerRef.current)
  };

  return (
    <Wrapper>
      {!countdownFinished && !countdownRunning && <Button onClick={startGame}>Start Game</Button>}
      {countdownRunning && <RedBox onClick={handleEarlyClick}></RedBox>}
      {countdownFinished && <GreenBox onClick={handleClick}></GreenBox>}
      <h2>{message}</h2>
    </Wrapper>
  );
}

export default ReactionTest;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 12px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const RedBox = styled(Box)`
  background-color: #E74C3C;
`;

const GreenBox = styled(Box)`
  background-color: #2ECC71;
`;