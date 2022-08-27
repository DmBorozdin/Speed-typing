import React, {useState, useEffect} from "react";
import {getText} from "../../api/api";
import LoadingScreen from "../loading-screen/loading-screen";
import Text from "../text/text";

const Main = () => {
  const [text, setText] = useState('');
  const [indexCurrentLetter, setIndexCurrentLetter] = useState(0);
  const [keyPress, setKeyPress] = useState('');
  const [wrong, setWrong] = useState(false);
  const [wrongWeight, setWrongWeight] = useState(0);
  const [accurancy, setAccurancy] = useState(100);

  const keyPressHandle = (evt) => setKeyPress(evt.key);

  useEffect(() => {
    getText(setText);

    document.addEventListener('keypress', keyPressHandle);

    return () => {
      document.removeEventListener('keypress', keyPressHandle);
    };
  }, []);

  useEffect(() => {
    setWrongWeight((100/text.length).toFixed(3));
  }, [text]);

  console.log(wrongWeight);

  useEffect(() => {
    if (keyPress === text[indexCurrentLetter]) {
      setIndexCurrentLetter(indexCurrentLetter+1);
      setWrong(false);
    } else if(keyPress) {
      setWrong(true);
      setAccurancy(accurancy-wrongWeight);
    }
  }, [keyPress]);

  if (!text) {
    return (<LoadingScreen/>);
  }

  return (
  <div className="container">
    <div className="content">
      <Text text={text} indexCurrentLetter={indexCurrentLetter} wrongInput={wrong}/>
      <div className="content__statistics">
        <div className="content__statistics_speed">
          <div className="content__statistics-caption">
            <span className="mdi mdi-speedometer"></span>
            скорость
          </div>
          <div className="content__statistics_value">
            <span>0</span>
            зн/мин
          </div>
        </div>
        <div className="content__statistics_accuracy">
          <div className="content__statistics-caption">
            <span className="mdi mdi-bullseye-arrow"></span>
            точность
          </div>
          <div className="content__statistics_value">
            <span>{accurancy.toFixed(1)}</span>
            %
          </div>
        </div>
        <a className="content__statistics-replay content__statistics-caption" href="/">
          <span className="mdi mdi-refresh"></span>
          заново
        </a>
      </div>
    </div>
  </div>
  )
};

export default Main;