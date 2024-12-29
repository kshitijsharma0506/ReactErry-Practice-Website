import {useState, useEffect, useRef} from 'react';
const App = () => {
  // Write your code here
  const [timer, useTimer] = useState(()=>{
    return localStorage.getItem("time") || 600;
  });
  let interval = useRef(null);

  useEffect(()=>{
    interval.current = setTimeout(()=>{
      useTimer(prevTimer => prevTimer-1);
    },1000);
    localStorage.setItem("time",timer);
    return()=>{
      clearTimeout(interval.current);
    }
  },[timer]);
  
  const convertTime=(tt)=>{
    return `${`${Math.floor(tt/60)}`.length == 1 ? `0${Math.floor(tt/60)}` : `${Math.floor(tt/60)}`}:${`${tt%60}`.length == 1 ? `0${tt%60}` : `${tt%60}`}`;
  }

  return(
    <>
      {convertTime(timer)}
    </>
  );

};

export default App;