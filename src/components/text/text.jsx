import React from "react";
import PropTypes from 'prop-types'

const Text = ({text, indexCurrentLetter, wrongInput}) => {
  const getClassName = (index) => {
    let className = 'tblack';
    if (index < indexCurrentLetter) {
      className = 'passed-text';
    }

    if (index === indexCurrentLetter) {
      className = wrongInput ? 'tred' : 'tgreen';
    }

    return className;
  };

  return <div className="content__text">
    {text.split('').map((letter, index) =>
      <span key={`${letter}-${index}`} className={getClassName(index)}>{letter}</span>
    )}
  </div>
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  indexCurrentLetter: PropTypes.number.isRequired,
  wrongInput: PropTypes.bool.isRequired
}

export default Text;