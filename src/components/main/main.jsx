import React from "react";

const Main = () => {

  return (
  <div className="container">
    <div className="content">
      <div className="content__text">
        Bacon ipsum dolor amet pork belly ham hock ham sirloin ball tip tri-tip jerky kevin jowl doner short loin pastrami rump cow. Shoulder pork loin pork drumstick ball tip, capicola leberkas kevin buffalo hamburger short ribs andouille shank meatloaf filet mignon. Bacon venison ham tri-tip shoulder alcatra jowl. Pork short ribs pancetta ground round, kevin shankle beef boudin bresaola ham hock venison porchetta. Alcatra picanha pork belly drumstick chuck.
      </div>
      <div className="content__statistics">
        <div className="content__statistics-speed">
          <div className="content__statistics-caption">
            <span className="mdi mdi-speedometer"></span>
            СКОРОСТЬ
          </div>
          <div>0 зн/мин</div>
        </div>
        <div className="content__statistics-accuracy">
          <div className="content__statistics-caption">
            <span className="mdi mdi-bullseye-arrow"></span>
            ТОЧНОСТЬ
          </div>
          <div>100%</div>
        </div>
        <div className="content__statistics-replay">ЗАНОВО</div>
      </div>
    </div>
  </div>
  )
};

export default Main;