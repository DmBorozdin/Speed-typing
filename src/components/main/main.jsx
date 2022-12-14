import React, {useState, useEffect} from "react";
import {getText} from "../../api/api";
import LoadingScreen from "../loading-screen/loading-screen";
import Text from "../text/text";

const DELAY = 1000;
const SECOND_IN_MINUTE = 60;
const MAX_ACCURANCY = 100;
const Digits = {
  ONE: 10,
  THREE: 1000
};

const Main = () => {
  const [text, setText] = useState('');
  const [indexCurrentLetter, setIndexCurrentLetter] = useState(0);
  const [keyPress, setKeyPress] = useState('');
  const [firstKeyPress, setFirstKeyPress] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [wrongWeight, setWrongWeight] = useState(0);
  const [accurancy, setAccurancy] = useState(MAX_ACCURANCY);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const keyPressHandle = (evt) => setKeyPress(evt.key);

  useEffect(() => {
    getText(setText);

    document.addEventListener('keypress', keyPressHandle);

    return () => {
      document.removeEventListener('keypress', keyPressHandle);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setWrongWeight(Math.round(MAX_ACCURANCY*Digits.THREE/text.length)/Digits.THREE);
  }, [text]);

  useEffect(() => {
    if (keyPress && start && !firstKeyPress) {
      setFirstKeyPress(true);
      const interval = setInterval(() => setTimer(timer => timer + 1), DELAY);
      setIntervalId(interval);
    }

    if (keyPress == text[indexCurrentLetter]) {
      setIndexCurrentLetter(indexCurrentLetter + 1);
      setWrong(false);
      setKeyPress('');
      if (text.length === indexCurrentLetter + 1) {
        clearInterval(intervalId);
      }
    } else if(keyPress && !wrong) {
      setWrong(true);
      setAccurancy(accurancy-wrongWeight);
    }
  }, [keyPress]);

  const buttonClickHandle = () => {
    setStart(true);
  }

  if (!text) {
    return (<LoadingScreen/>);
  }

  return (
  <div className="container">
    <div className={`start-block ${!start ? 'active-block' : ''}`}>
      <h1 className="start-block__caption">?????????????????????? ????????????????. ??????????????!</h1>
      <button className="start-block__button" onClick={buttonClickHandle}>???????????? ????????????????</button>
    </div>
    <div className={`content ${start && text.length !== indexCurrentLetter ? 'active-block' : ''}`}>
      <Text text={text} indexCurrentLetter={indexCurrentLetter} wrongInput={wrong}/>
      <div className="content__statistics">
        <div className="content__statistics_speed">
          <div className="content__statistics-caption">
            <span className="mdi mdi-speedometer"></span>
            ????????????????
          </div>
          <div className="content__statistics_value">
            <span>{timer !== 0 ? Math.round(indexCurrentLetter*SECOND_IN_MINUTE/timer) : 0}</span>
            ????/??????
          </div>
        </div>
        <div className="content__statistics_accuracy">
          <div className="content__statistics-caption">
            <span className="mdi mdi-bullseye-arrow"></span>
            ????????????????
          </div>
          <div className="content__statistics_value">
            <span>{Math.round(accurancy*Digits.ONE)/Digits.ONE}</span>
            %
          </div>
        </div>
        <a className="content__statistics-replay content__statistics-caption" href="/">
          <span className="mdi mdi-refresh"></span>
          ????????????
        </a>
      </div>
    </div>
    <div className={`finish-block ${text.length === indexCurrentLetter ? 'active-block' : ''}`}>
      <h1 className="finish-block__caption">??????????????????????!</h1>
      <p className="finish-block__text">???????? ???????????????? ???????????? <span>{timer !== 0 ? Math.round(indexCurrentLetter*SECOND_IN_MINUTE/timer) : 0}</span> ????/?????? ?? ?????????????????? <span>{Math.round(accurancy*Digits.ONE)/Digits.ONE}</span>%</p>
      <a href="/" className="finish-block__replay" onClick={buttonClickHandle}>?????????????????????? ??????????</a>
    </div>
  </div>
  )
};

export default Main;