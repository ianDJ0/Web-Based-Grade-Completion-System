import React from "react";
import Sidebar from "../UI/Home_UI/Sidebar";
import TopNav from "../UI/Home_UI/TopNav";

import "./Homepage.css";

const Homepage = (props) => {
  //THIS IS THE HOMEPAGE FOR STUDENT USER TYPES

  return (
    <>
      <TopNav />
      <Sidebar active={"homepage"} />
      <div className="body-home">
        <div className="home-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor
            orci dapibus ultrices in iaculis nunc. Risus nec feugiat in
            fermentum posuere urna nec. Ultricies integer quis auctor elit sed
            vulputate. Convallis convallis tellus id interdum velit laoreet.
            Dictumst vestibulum rhoncus est pellentesque. Quis lectus nulla at
            volutpat diam ut. Aliquet sagittis id consectetur purus ut. Ante
            metus dictum at tempor. Sapien et ligula ullamcorper malesuada proin
            libero nunc. Scelerisque viverra mauris in aliquam sem. Pellentesque
            pulvinar pellentesque habitant morbi tristique. Gravida in fermentum
            et sollicitudin ac orci. Enim praesent elementum facilisis leo vel
            fringilla est ullamcorper. Sit amet dictum sit amet justo donec
            enim. Fermentum odio eu feugiat pretium nibh. Ac placerat vestibulum
            lectus mauris ultrices. Sed elementum tempus egestas sed sed risus
            pretium quam vulputate.
          </p>
        </div>
      </div>
    </>
  );
};
export default Homepage;
