const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const getText = (setText) => {
  fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&start-with-lorem=1&sentences=4')
    .then((response) => {
      if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .then((text) => setText(text.join(' ')))
    .catch((err) => {
      setText('Bacon ipsum dolor amet veniam eu irure pariatur sint lorem qui proident tail, incididunt turkey fatback culpa labore in. Duis irure velit reprehenderit, andouille cupidatat alcatra bacon minim lorem.')
      throw err;
    })
};