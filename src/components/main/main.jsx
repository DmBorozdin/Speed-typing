import React, {useState, useEffect} from "react";
import {getText} from "../../api/api";
import LoadingScreen from "../loading-screen/loading-screen";
import Text from "../text/text";

const Main = () => {
  const [text, setText] = useState('');
  const [indexCurrentLetter, setIndexCurrentLetter] = useState(0);
  const [keyPress, setKeyPress] = useState('');
  const [firstKeyPress, setFirstKeyPress] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [wrongWeight, setWrongWeight] = useState(0);
  const [accurancy, setAccurancy] = useState(100);
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
    setWrongWeight(Math.round(100000/text.length)/1000);
  }, [text]);

  useEffect(() => {
    if (keyPress && start && !firstKeyPress) {
      setFirstKeyPress(true);
      const interval = setInterval(() => setTimer(timer => timer + 1), 1000);
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
      <h1 className="start-block__caption">Приготовься печатать. Поехали!</h1>
      <button className="start-block__button" onClick={buttonClickHandle}>Начать печатать</button>
    </div>
    <div className={`content ${start && text.length !== indexCurrentLetter ? 'active-block' : ''}`}>
      <Text text={text} indexCurrentLetter={indexCurrentLetter} wrongInput={wrong}/>
      <div className="content__statistics">
        <div className="content__statistics_speed">
          <div className="content__statistics-caption">
            <span className="mdi mdi-speedometer"></span>
            скорость
          </div>
          <div className="content__statistics_value">
            <span>{timer !== 0 ? Math.round(indexCurrentLetter*60/timer) : 0}</span>
            зн/мин
          </div>
        </div>
        <div className="content__statistics_accuracy">
          <div className="content__statistics-caption">
            <span className="mdi mdi-bullseye-arrow"></span>
            точность
          </div>
          <div className="content__statistics_value">
            <span>{Math.round(accurancy*10)/10}</span>
            %
          </div>
        </div>
        <a className="content__statistics-replay content__statistics-caption" href="/">
          <span className="mdi mdi-refresh"></span>
          заново
        </a>
      </div>
    </div>
    <div className={`finish-block ${text.length === indexCurrentLetter ? 'active-block' : ''}`}>
      <h1 className="finish-block__caption">Поздравляем!</h1>
      <p className="finish-block__text">Ваша скорость печати <span>{timer !== 0 ? Math.round(indexCurrentLetter*60/timer) : 0}</span> зн/мин с точностью <span>{Math.round(accurancy*10)/10}</span>%</p>
      <a href="/" className="finish-block__replay" onClick={buttonClickHandle}>Попробовать снова</a>
    </div>
  </div>
  )
};

export default Main;