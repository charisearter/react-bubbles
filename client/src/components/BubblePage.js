import React, { useState, Fragment } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

 
  const getColors = e => {
      e.preventDefault();
      //axios get request for colors with axios authority
      axiosWithAuth()
        .get('/api/colors') 
        .then(res => {
          console.log(res)
          setColorList(res.data)
        })
        .catch(err => console.log(err.response));
    };

  return (
    <Fragment>
   {/* //trying to rember how to get get request to display without button click */}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />

    </Fragment>
  );
};

export default BubblePage;
