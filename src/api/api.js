const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const getText = (setText) => {
  fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&start-with-lorem=1')
    .then((response) => {
      if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .then((text) => setText(text.join(' ')))
    .catch((err) => {
      setText('Bacon ipsum dolor amet pork belly ham hock ham sirloin ball tip tri-tip jerky kevin jowl doner short loin pastrami rump cow. Shoulder pork loin pork drumstick ball tip, capicola leberkas kevin buffalo hamburger short ribs andouille shank meatloaf filet mignon. Bacon venison ham tri-tip shoulder alcatra jowl. Pork short ribs pancetta ground round, kevin shankle beef boudin bresaola ham hock venison porchetta. Alcatra picanha pork belly drumstick chuck.')
      throw err;
    })
};