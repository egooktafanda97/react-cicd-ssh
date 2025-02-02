import  {  Fragment } from 'react';
import loaderimg from "../../../assets/images/media/loader.svg"

const Loader = () => {
  return(
  <Fragment>
     <div id="loader" >
        <img src={loaderimg} alt=""/>
    </div>
  </Fragment>
);}

export default Loader;
