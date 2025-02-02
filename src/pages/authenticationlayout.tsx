import { Fragment, useEffect, useState } from 'react'
import Switcher from '@/components/common/switcher/switcher';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Outlet, useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { Initialload } from '@/components/common/contextapi';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
const Authenticationlayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const [pageloading, setpageloading] = useState(false)
  return (
    <Fragment>
      <Initialload.Provider value={{ pageloading, setpageloading }}>
        <Provider store={store}>
          <Switcher />
          <Outlet />
        </Provider>
      </Initialload.Provider>
    </Fragment>
  )
}

export default Authenticationlayout